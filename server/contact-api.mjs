import crypto from 'node:crypto'
import {
  copyFile,
  mkdir,
  readFile,
  readdir,
  rename,
  unlink,
  writeFile,
} from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { promisify } from 'node:util'

import nodemailer from 'nodemailer'

const scrypt = promisify(crypto.scrypt)

const port = Number.parseInt(process.env.PORT || '3000', 10)
const maxBodySize = 32 * 1024
const rateWindowMs = 15 * 60 * 1000
const contactRequestsPerWindow = 5
const loginRequestsPerWindow = 5
const minimumFillTimeMs = 2500
const maximumFormAgeMs = 2 * 60 * 60 * 1000
const sessionDurationMs = 8 * 60 * 60 * 1000
const sessionCookieName = 'ets_petit_admin_session'
const pricingDataFile = process.env.PRICING_DATA_FILE || '/app/data/pricing.json'
const pricingBackupDirectory = path.join(path.dirname(pricingDataFile), 'backups')
const maximumPricingBackups = 20

const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH || ''
const adminSessionSecret = process.env.ADMIN_SESSION_SECRET || ''
const adminConfigured = Boolean(adminEmail && adminPasswordHash && adminSessionSecret)

const defaultPricingValues = {
  'depannage-semaine': { amount: 50, travelFee: 40 },
  'depannage-weekend': { amount: 80, travelFee: 40 },
  'pack-eco': { amount: 450 },
  'pack-confort': { amount: 1290 },
  'pack-performance': { amount: 1650 },
  'panel-basic': { minimum: 700, maximum: 1100 },
  'panel-standard': { minimum: 1100, maximum: 1600 },
  'panel-premium': { minimum: 1600, maximum: 2300 },
}

const pricingSchema = {
  'depannage-semaine': ['amount', 'travelFee'],
  'depannage-weekend': ['amount', 'travelFee'],
  'pack-eco': ['amount'],
  'pack-confort': ['amount'],
  'pack-performance': ['amount'],
  'panel-basic': ['minimum', 'maximum'],
  'panel-standard': ['minimum', 'maximum'],
  'panel-premium': ['minimum', 'maximum'],
}

const smtpPort = Number.parseInt(process.env.SMTP_PORT || '587', 10)
const smtpSecure = process.env.SMTP_SECURE === 'true'
const smtpConfigured = Boolean(
  process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD &&
    process.env.CONTACT_TO &&
    process.env.CONTACT_FROM,
)
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
)
const contactRateLimits = new Map()
const loginRateLimits = new Map()
const sessions = new Map()

let pricingState

const transporter = smtpConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    })
  : null

function sendJson(response, status, payload) {
  const body = JSON.stringify(payload)
  response.writeHead(status, {
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'X-Content-Type-Options': 'nosniff',
  })
  response.end(body)
}

function requestIp(request) {
  const realIp = request.headers['x-real-ip']
  if (typeof realIp === 'string' && realIp) {
    return realIp
  }

  const forwardedFor = request.headers['x-forwarded-for']
  if (typeof forwardedFor === 'string' && forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  return request.socket.remoteAddress || 'unknown'
}

function isRateLimited(store, key, maximumRequests) {
  const now = Date.now()
  const current = store.get(key)

  if (!current || current.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + rateWindowMs })
    return false
  }

  current.count += 1
  return current.count > maximumRequests
}

function isAllowedOrigin(request) {
  const origin = request.headers.origin
  if (!origin) {
    return true
  }

  if (allowedOrigins.size > 0) {
    return allowedOrigins.has(origin)
  }

  const forwardedHost = request.headers['x-forwarded-host']
  const forwardedProtocol = request.headers['x-forwarded-proto']
  if (typeof forwardedHost !== 'string' || typeof forwardedProtocol !== 'string') {
    return false
  }

  return origin === `${forwardedProtocol}://${forwardedHost}`
}

function isJsonRequest(request) {
  return request.headers['content-type']?.split(';')[0] === 'application/json'
}

async function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let size = 0
    let tooLarge = false
    const chunks = []

    request.on('data', (chunk) => {
      size += chunk.length
      if (size > maxBodySize) {
        tooLarge = true
        return
      }
      chunks.push(chunk)
    })

    request.on('end', () => {
      if (tooLarge) {
        reject(Object.assign(new Error('Payload too large'), { status: 413 }))
        return
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))
      } catch {
        reject(Object.assign(new Error('Invalid JSON'), { status: 400 }))
      }
    })

    request.on('error', reject)
  })
}

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function validateContactPayload(payload) {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  const name = cleanString(payload.name)
  const phone = cleanString(payload.phone)
  const email = cleanString(payload.email).toLowerCase()
  const message = cleanString(payload.message)
  const website = cleanString(payload.website)
  const locale = payload.locale === 'en' ? 'en' : 'fr'
  const formStartedAt = Number(payload.formStartedAt)
  const elapsed = Date.now() - formStartedAt

  if (website) {
    return { spam: true, locale }
  }

  if (
    name.length < 2 ||
    name.length > 100 ||
    phone.length < 6 ||
    phone.length > 30 ||
    email.length > 254 ||
    message.length < 10 ||
    message.length > 3000 ||
    payload.consent !== true ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^[+()\d\s.-]+$/.test(phone) ||
    !Number.isFinite(formStartedAt) ||
    elapsed < minimumFillTimeMs ||
    elapsed > maximumFormAgeMs
  ) {
    return null
  }

  return { name, phone, email, message, locale, spam: false }
}

function normalizePricingValues(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return null
  }

  const normalized = {}

  for (const [offerId, fieldNames] of Object.entries(pricingSchema)) {
    const offer = value[offerId]
    if (!offer || typeof offer !== 'object' || Array.isArray(offer)) {
      return null
    }

    normalized[offerId] = {}
    for (const fieldName of fieldNames) {
      const fieldValue = Number(offer[fieldName])
      if (!Number.isFinite(fieldValue) || fieldValue < 0 || fieldValue > 100_000) {
        return null
      }
      normalized[offerId][fieldName] = Math.round(fieldValue * 100) / 100
    }

    if (
      fieldNames.includes('minimum') &&
      normalized[offerId].maximum < normalized[offerId].minimum
    ) {
      return null
    }
  }

  return normalized
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function successMessage(locale) {
  return locale === 'en'
    ? 'Your request has been sent successfully.'
    : 'Votre demande a bien été envoyée.'
}

function parseCookies(request) {
  const cookies = {}
  const cookieHeader = request.headers.cookie
  if (!cookieHeader) {
    return cookies
  }

  for (const item of cookieHeader.split(';')) {
    const separatorIndex = item.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }
    const name = item.slice(0, separatorIndex).trim()
    const value = item.slice(separatorIndex + 1).trim()
    cookies[name] = value
  }
  return cookies
}

function sessionKey(token) {
  return crypto
    .createHmac('sha256', adminSessionSecret)
    .update(token)
    .digest('hex')
}

function getSession(request) {
  if (!adminConfigured) {
    return null
  }

  const token = parseCookies(request)[sessionCookieName]
  if (!token) {
    return null
  }

  const key = sessionKey(token)
  const session = sessions.get(key)
  if (!session || session.expiresAt <= Date.now()) {
    sessions.delete(key)
    return null
  }

  return { key, ...session }
}

function setSessionCookie(request, response, token) {
  const forwardedProtocol = request.headers['x-forwarded-proto']
  const secure = forwardedProtocol === 'https' ? '; Secure' : ''
  response.setHeader(
    'Set-Cookie',
    `${sessionCookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(
      sessionDurationMs / 1000,
    )}${secure}`,
  )
}

function clearSessionCookie(request, response) {
  const forwardedProtocol = request.headers['x-forwarded-proto']
  const secure = forwardedProtocol === 'https' ? '; Secure' : ''
  response.setHeader(
    'Set-Cookie',
    `${sessionCookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`,
  )
}

async function verifyAdminPassword(password) {
  const [saltHex, expectedHashHex] = adminPasswordHash.split(':')
  if (
    !saltHex ||
    !expectedHashHex ||
    !/^[a-f0-9]+$/i.test(saltHex) ||
    !/^[a-f0-9]+$/i.test(expectedHashHex)
  ) {
    return false
  }

  const expectedHash = Buffer.from(expectedHashHex, 'hex')
  const derivedHash = await scrypt(password, Buffer.from(saltHex, 'hex'), expectedHash.length)
  return (
    expectedHash.length === derivedHash.length &&
    crypto.timingSafeEqual(expectedHash, derivedHash)
  )
}

async function createPricingBackup() {
  try {
    await readFile(pricingDataFile)
  } catch (error) {
    if (error?.code === 'ENOENT') {
      return
    }
    throw error
  }

  await mkdir(pricingBackupDirectory, { recursive: true })
  const timestamp = new Date().toISOString().replaceAll(':', '-')
  await copyFile(pricingDataFile, path.join(pricingBackupDirectory, `pricing-${timestamp}.json`))

  const backupFiles = (await readdir(pricingBackupDirectory))
    .filter((fileName) => fileName.startsWith('pricing-') && fileName.endsWith('.json'))
    .sort()

  for (const fileName of backupFiles.slice(0, -maximumPricingBackups)) {
    await unlink(path.join(pricingBackupDirectory, fileName))
  }
}

async function persistPricing(values, options = {}) {
  const updatedAt = new Date().toISOString()
  const state = { version: 1, updatedAt, values }
  const temporaryFile = `${pricingDataFile}.${process.pid}.tmp`

  await mkdir(path.dirname(pricingDataFile), { recursive: true })
  if (options.backup) {
    await createPricingBackup()
  }
  await writeFile(temporaryFile, `${JSON.stringify(state, null, 2)}\n`, { mode: 0o600 })
  await rename(temporaryFile, pricingDataFile)
  pricingState = state
  return state
}

async function initializePricing() {
  try {
    const storedState = JSON.parse(await readFile(pricingDataFile, 'utf8'))
    const values = normalizePricingValues(storedState?.values)
    if (!values) {
      throw new Error('Invalid pricing data')
    }
    pricingState = {
      version: 1,
      updatedAt:
        typeof storedState.updatedAt === 'string'
          ? storedState.updatedAt
          : new Date().toISOString(),
      values,
    }
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      console.error(`[contact-api] pricing store reset: ${error.message}`)
      try {
        await mkdir(pricingBackupDirectory, { recursive: true })
        const timestamp = new Date().toISOString().replaceAll(':', '-')
        await rename(
          pricingDataFile,
          path.join(pricingBackupDirectory, `pricing-corrupt-${timestamp}.json`),
        )
      } catch {
        // The invalid file may already be unavailable; defaults are still restored below.
      }
    }
    await persistPricing(defaultPricingValues)
  }
}

async function handleContactRequest(request, response, requestId) {
  if (!isJsonRequest(request)) {
    sendJson(response, 415, { ok: false, message: 'Unsupported content type' })
    return
  }

  if (!isAllowedOrigin(request)) {
    sendJson(response, 403, { ok: false, message: 'Origin not allowed' })
    return
  }

  if (
    isRateLimited(
      contactRateLimits,
      requestIp(request),
      contactRequestsPerWindow,
    )
  ) {
    response.setHeader('Retry-After', Math.ceil(rateWindowMs / 1000))
    sendJson(response, 429, {
      ok: false,
      message: 'Trop de demandes. Merci de réessayer dans quelques minutes.',
    })
    return
  }

  const payload = validateContactPayload(await readJsonBody(request))

  if (!payload) {
    sendJson(response, 400, {
      ok: false,
      message: 'Les informations envoyées sont incomplètes ou invalides.',
    })
    return
  }

  if (payload.spam) {
    sendJson(response, 200, { ok: true, message: successMessage(payload.locale) })
    return
  }

  if (!transporter) {
    console.error(`[contact-api] ${requestId} SMTP configuration missing`)
    sendJson(response, 503, {
      ok: false,
      message: 'Le formulaire est temporairement indisponible. Merci de nous appeler directement.',
    })
    return
  }

  const safeName = payload.name.replace(/[\r\n]/g, ' ')
  await transporter.sendMail({
    from: process.env.CONTACT_FROM,
    to: process.env.CONTACT_TO,
    replyTo: {
      name: safeName,
      address: payload.email,
    },
    subject: `Demande depuis ets-petit.fr — ${safeName}`,
    text: [
      `Nom : ${payload.name}`,
      `Téléphone : ${payload.phone}`,
      `Email : ${payload.email}`,
      '',
      'Message :',
      payload.message,
    ].join('\n'),
    html: `
      <h2>Nouvelle demande depuis ets-petit.fr</h2>
      <p><strong>Nom :</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Téléphone :</strong> ${escapeHtml(payload.phone)}</p>
      <p><strong>Email :</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(payload.message).replaceAll('\n', '<br>')}</p>
    `,
  })

  sendJson(response, 200, { ok: true, message: successMessage(payload.locale) })
}

async function handleAdminLogin(request, response) {
  if (!adminConfigured) {
    sendJson(response, 503, {
      ok: false,
      message: 'L’administration doit être configurée par le gestionnaire du site.',
    })
    return
  }

  if (!isJsonRequest(request) || !isAllowedOrigin(request)) {
    sendJson(response, 403, { ok: false, message: 'Requête refusée.' })
    return
  }

  const ip = requestIp(request)
  if (isRateLimited(loginRateLimits, ip, loginRequestsPerWindow)) {
    response.setHeader('Retry-After', Math.ceil(rateWindowMs / 1000))
    sendJson(response, 429, {
      ok: false,
      message: 'Trop de tentatives. Merci de réessayer dans quelques minutes.',
    })
    return
  }

  const payload = await readJsonBody(request)
  const email = cleanString(payload?.email).toLowerCase()
  const password = typeof payload?.password === 'string' ? payload.password : ''
  const validPassword = password.length <= 256 && (await verifyAdminPassword(password))

  if (email !== adminEmail || !validPassword) {
    sendJson(response, 401, { ok: false, message: 'Identifiants incorrects.' })
    return
  }

  loginRateLimits.delete(ip)
  const token = crypto.randomBytes(32).toString('base64url')
  sessions.set(sessionKey(token), {
    email: adminEmail,
    expiresAt: Date.now() + sessionDurationMs,
  })
  setSessionCookie(request, response, token)
  sendJson(response, 200, { ok: true })
}

const cleanupTimer = setInterval(() => {
  const now = Date.now()

  for (const store of [contactRateLimits, loginRateLimits]) {
    for (const [key, entry] of store) {
      if (entry.resetAt <= now) {
        store.delete(key)
      }
    }
  }

  for (const [key, session] of sessions) {
    if (session.expiresAt <= now) {
      sessions.delete(key)
    }
  }
}, rateWindowMs)
cleanupTimer.unref()

const server = http.createServer(async (request, response) => {
  const requestId = crypto.randomUUID()
  const requestPath = new URL(request.url || '/', 'http://localhost').pathname

  try {
    if (request.method === 'GET' && requestPath === '/healthz') {
      sendJson(response, 200, { ok: true, smtpConfigured, adminConfigured })
      return
    }

    if (request.method === 'GET' && requestPath === '/api/pricing') {
      sendJson(response, 200, { ok: true, ...pricingState })
      return
    }

    if (request.method === 'POST' && requestPath === '/api/contact') {
      await handleContactRequest(request, response, requestId)
      return
    }

    if (request.method === 'POST' && requestPath === '/api/admin/login') {
      await handleAdminLogin(request, response)
      return
    }

    if (request.method === 'GET' && requestPath === '/api/admin/session') {
      const session = getSession(request)
      if (!session) {
        sendJson(response, 401, { ok: false })
        return
      }
      sendJson(response, 200, { ok: true, email: session.email })
      return
    }

    if (request.method === 'POST' && requestPath === '/api/admin/logout') {
      if (!isAllowedOrigin(request)) {
        sendJson(response, 403, { ok: false, message: 'Requête refusée.' })
        return
      }

      const session = getSession(request)
      if (session) {
        sessions.delete(session.key)
      }
      clearSessionCookie(request, response)
      sendJson(response, 200, { ok: true })
      return
    }

    if (request.method === 'PUT' && requestPath === '/api/admin/pricing') {
      const session = getSession(request)
      if (!session) {
        sendJson(response, 401, { ok: false, message: 'Votre session a expiré.' })
        return
      }
      if (!isJsonRequest(request) || !isAllowedOrigin(request)) {
        sendJson(response, 403, { ok: false, message: 'Requête refusée.' })
        return
      }

      const payload = await readJsonBody(request)
      const values = normalizePricingValues(payload?.values)
      if (!values) {
        sendJson(response, 400, {
          ok: false,
          message: 'Les tarifs envoyés sont invalides.',
        })
        return
      }

      const state = await persistPricing(values, { backup: true })
      console.log(
        `[contact-api] ${requestId} pricing updated by ${session.email} from ${requestIp(request)}`,
      )
      sendJson(response, 200, { ok: true, ...state })
      return
    }

    sendJson(response, 404, { ok: false, message: 'Not found' })
  } catch (error) {
    const status = Number.isInteger(error?.status) ? error.status : 500
    console.error(
      `[contact-api] ${requestId} request failed: ${
        error instanceof Error ? error.message : 'unknown error'
      }`,
    )
    sendJson(response, status, {
      ok: false,
      message: 'Le service est temporairement indisponible. Merci de réessayer.',
    })
  }
})

await initializePricing()

server.listen(port, '0.0.0.0', () => {
  console.log(
    `[contact-api] listening on port ${port}; smtpConfigured=${smtpConfigured}; adminConfigured=${adminConfigured}`,
  )
})

function shutdown() {
  server.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

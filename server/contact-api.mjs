import crypto from 'node:crypto'
import http from 'node:http'

import nodemailer from 'nodemailer'

const port = Number.parseInt(process.env.PORT || '3000', 10)
const maxBodySize = 20 * 1024
const rateWindowMs = 15 * 60 * 1000
const maxRequestsPerWindow = 5
const minimumFillTimeMs = 2500
const maximumFormAgeMs = 2 * 60 * 60 * 1000

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
const rateLimits = new Map()

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
  const forwardedIp = request.headers['x-real-ip']
  return typeof forwardedIp === 'string' && forwardedIp ? forwardedIp : request.socket.remoteAddress || 'unknown'
}

function isRateLimited(ip) {
  const now = Date.now()
  const current = rateLimits.get(ip)

  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + rateWindowMs })
    return false
  }

  current.count += 1
  return current.count > maxRequestsPerWindow
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

function validatePayload(payload) {
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

const cleanupTimer = setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimits) {
    if (entry.resetAt <= now) {
      rateLimits.delete(ip)
    }
  }
}, rateWindowMs)
cleanupTimer.unref()

const server = http.createServer(async (request, response) => {
  const requestId = crypto.randomUUID()

  if (request.method === 'GET' && request.url === '/healthz') {
    sendJson(response, 200, { ok: true, smtpConfigured })
    return
  }

  if (request.method !== 'POST' || request.url !== '/api/contact') {
    sendJson(response, 404, { ok: false, message: 'Not found' })
    return
  }

  if (request.headers['content-type']?.split(';')[0] !== 'application/json') {
    sendJson(response, 415, { ok: false, message: 'Unsupported content type' })
    return
  }

  if (!isAllowedOrigin(request)) {
    sendJson(response, 403, { ok: false, message: 'Origin not allowed' })
    return
  }

  if (isRateLimited(requestIp(request))) {
    response.setHeader('Retry-After', Math.ceil(rateWindowMs / 1000))
    sendJson(response, 429, {
      ok: false,
      message: 'Trop de demandes. Merci de réessayer dans quelques minutes.',
    })
    return
  }

  try {
    const payload = validatePayload(await readJsonBody(request))

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
  } catch (error) {
    const status = Number.isInteger(error?.status) ? error.status : 500
    console.error(`[contact-api] ${requestId} request failed: ${error instanceof Error ? error.message : 'unknown error'}`)
    sendJson(response, status, {
      ok: false,
      message: 'Le formulaire est temporairement indisponible. Merci de nous appeler directement.',
    })
  }
})

server.listen(port, '0.0.0.0', () => {
  console.log(`[contact-api] listening on port ${port}; smtpConfigured=${smtpConfigured}`)
})

function shutdown() {
  server.close(() => process.exit(0))
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

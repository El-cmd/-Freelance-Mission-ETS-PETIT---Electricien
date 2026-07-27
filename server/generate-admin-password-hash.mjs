import crypto from 'node:crypto'

const password = process.env.ADMIN_PASSWORD || ''

if (password.length < 12) {
  console.error('Le mot de passe doit contenir au moins 12 caractères.')
  process.exit(1)
}

const salt = crypto.randomBytes(16)
const hash = crypto.scryptSync(password, salt, 64)

process.stdout.write(`${salt.toString('hex')}:${hash.toString('hex')}\n`)

import { Secret } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
  const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn })

  return token
}

const verifyToken = (token: string, secret: Secret) => {
  const decoded = jwt.verify(token, secret)
  return decoded
}

export const jwtHelpers = {
  generateToken,
  verifyToken,
}

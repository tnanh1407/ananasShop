import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const ACCESS_TOKEN_EXPIRES_IN = '30m'
const REFRESH_TOKEN_EXPIRES_IN_MS = 7 * 24 * 60 * 60 * 1000 // 7 ngày

export const generateAccessToken = (payload: { userId: string; role: string }) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN
  })
}

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex')
}

export const getRefreshTokenExpiredAt = () => {
  return new Date(Date.now() + REFRESH_TOKEN_EXPIRES_IN_MS)
}

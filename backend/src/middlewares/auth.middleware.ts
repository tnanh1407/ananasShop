import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Chưa đăng nhập' })
    }

    const token = authHeader.split(' ')[1]

    const decode = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      userId: string
      role: string
    }
    req.user = {
      userId: decode.userId,
      role: decode.role
    }
    next()
  } catch (error) {
    console.error('Lỗi function authMiddleWare : ', error)
    return res.status(401).json({ message: 'Token không hợp lệ' })
  }
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user
  } catch (error) { }
}

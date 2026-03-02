import { NextFunction, Request, Response } from 'express'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
// Middleware xác thực người dùng
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1 . Lấy token từ header
    const authHeader = req.headers.authorization
    // 2. Kiểm tra token có hợp lệ hay không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('[authMiddleWare][authenticated] : Chưa đăng nhập')
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
    next(error)
  }
}

export const loginRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng thử lại sau 15 phút.'
  },
  standardHeaders: true,
  legacyHeaders: false
})

// Xác định role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if (!user) {
      return res.status(401).json({ message: 'Chưa đăng nhập' })
    }
    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: 'Bạn không có quyền truy cập'
      })
    }
    next()
  }
}

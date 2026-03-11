import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import UserModel from '../models/user.model.js'
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiredAt } from '~/utils/token.js'
import SessionModel from '~/models/session.model.js'
import { registerShema } from '~/schemas/auth.schema.js'
import { AppError } from '~/utils/AppError.js'

const saltRounds = 10 // Số vòng băm cho bcrypt

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = registerShema.parse(req.body)
    const existing = await UserModel.findOne({
      $or: [{ userName: input.userName }, { email: input.email }]
    })

    if (existing) {
      throw new AppError('Username hoặc email không tồn tại ! ', 400)
    }

    const password = await bcrypt.hash(input.password, saltRounds)

    const newUser = await UserModel.create({
      fullName: input.fullName,
      userName: input.userName,
      email: input.email,
      passwordHash: password,
      role: 'user',
      isActive: true
    })

    return res.status(201).json({
      message: 'Đăng kí thành công !',
      data: {
        id: newUser.id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        email: newUser.email
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return next(new AppError(error.issues.map((e) => e.message).join(', '), 400))
    }
    next(error)
  }
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { identifier, password } = req.body
    if (!password || !identifier) {
      throw new AppError('Vui lòng cung cấp đầy đủ thông tin đăng nhập', 400)
    }
    const user = await UserModel.findOne({
      $or: [
        {
          userName: identifier
        },
        {
          email: identifier
        }
      ]
    }).select('+passwordHash')

    if (!user) {
      throw new AppError('username hoặc mật khẩu không đúng', 401)
    }
    if (!user.passwordHash) {
      throw new AppError('Tài khoản này đăng nhập bằng Google/Facebook', 400)
    }

    if (!user.isActive) {
      throw new AppError('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm chi tiết.', 403)
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      throw new AppError('username hoặc mật khẩu không đúng', 401)
    }
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role
    })

    const refreshToken = generateRefreshToken()
    const refreshTokenHash = await bcrypt.hash(refreshToken, saltRounds)
    await SessionModel.create({
      userId: user.id,
      refreshTokenHash,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] ?? 'unknown',
      expiredAt: getRefreshTokenExpiredAt()
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: getRefreshTokenExpiredAt()
    })

    user.lastLoginAt = new Date() 
    await user.save()

    return res.status(200).json({
      accessToken: accessToken,
      data: {
        id: user.id,
        fullName: user.fullName,
        userName: user.userName,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    next(error)
  }
}

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      throw new AppError('Không tìm thấy refresh token', 400)
    }
    await SessionModel.deleteOne({ refreshToken })
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    return res.status(200).json({ message: 'Logout thành công' })
  } catch (error) {
    next(error)
  }
}

export const logoutAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId
    await SessionModel.deleteMany({ userId: userId })
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    return res.status(200).json({ message: 'Đã đăng xuất khỏi tất cả thiết bị' })
  } catch (error) {
    next(error)
  }
}

// Refresh Token
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oldToken = req.cookies.refreshToken
    if (!oldToken) {
      throw new AppError('Không tìm thấy refresh token ', 400)
    }

    const session = await SessionModel.findOne({ refreshToken: oldToken })

    if (!session) {
      throw new AppError('Refresh token không hợp lệ', 401)
    }

    if (session.isRevoked) {
      await SessionModel.deleteOne({ userId: session.userId })
      throw new AppError('Phát hiện token reuse . vui lòng đăng nhập lại ', 401)
    }
    n
  } catch (error) {
    next(error)
  }
}

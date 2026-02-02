import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { z } from 'zod'
import UserModel from '../models/user.model.js'
import { registerSchema } from '~/schemas/auth.schema.js'
import { generateAccessToken, generateRefreshToken, getRefreshTokenExpiredAt } from '~/utils/token.js'
import SessionModel from '~/models/session.model.js'
import { UserPopulated } from '~/types/auth.type.js'

export const registerCpntroller = async (req: Request, res: Response) => {
  try {
    // 1. Validated dữ liệu từ Zod
    const input = registerSchema.parse(req.body)

    // 2. Kiểm tra xem user đã tồn tại chưa (email hoặc username)
    const usernameExisting = await UserModel.findOne({ username: input.username })
    if (usernameExisting) {
      console.error('Check username : Đã tồn tại trong hệ thống !')
      return res.status(400).json({ message: 'username đã tồn tại trong hệ thống' })
    }

    const emailExisting = await UserModel.findOne({ email: input.email })
    if (emailExisting) {
      console.error('Check email : Đã tồn tại trong hệ thống !')
      return res.status(400).json({ message: 'email đã tồn tại trong hệ thống' })
    }

    // 3. hasspassed password
    const saltRounds = 10
    const password = await bcrypt.hash(input.password, saltRounds)

    // 4 Lưu vào database
    const newUser = await UserModel.create({
      fullname: input.fullname,
      username: input.username,
      email: input.email,
      passwordHash: password,
      role: 'user',
      isActive: true
    })

    return res.status(201).json({
      message: 'Đăng kí thành công !',
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email
      }
    })
  } catch (error) {
    console.error(`Function register in Controller :  ${error}`)
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Dữ liệu không hợp lệ', error: error.message })
    }
    console.error('Register error:', error)
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    // 1. Tìm user
    const user = await UserModel.findOne({ username }).select('+passwordHash')
    if (!user) {
      console.error('Không tìm thấy username này')
      return res.status(401).json({ message: 'username hoặc mật khẩu không đúng' })
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      console.error('Mật khẩu không khớp')
      return res.status(401).json({ message: 'username hoặc mật khẩu không đúng' })
    }

    // 3. Tạo tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      role: user.role
    })

    const refreshToken = generateRefreshToken()
    // 4. Lưu session
    await SessionModel.create({
      userId: user.id,
      refreshToken,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'] ?? 'unknown',
      expiredAt: getRefreshTokenExpiredAt()
    })

    // 5. Set cookie refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: getRefreshTokenExpiredAt()
    })

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      accessToken,
      user: {
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
      console.error('Không tìm thấy refresh token ')
      return res.status(401).json({ message: 'Không có refresh token' })
    }

    // 1. Tìm session
    const session = await SessionModel.findOne({ refreshToken }).populate<{ userId: UserPopulated }>('userId', 'role')
    if (!session || !session.userId) {
      console.error('Refresh token không hợp lệ')
      return res.status(401).json({ message: 'Refresh token không hợp lệ' })
    }

    // 2. Kiểm tra session Còn hạn không
    if (session.expiredAt < new Date()) {
      await session.deleteOne()
      console.error('Refresh token đã hết hạn')
      return res.status(401).json({ message: 'Refresh token đã hết hạn' })
    }

    const user = session.userId as { _id: string; role: string }
    // 3. Tạo accessToken mới
    const accessToken = generateAccessToken({ userId: user._id, role: user.role })

    // 4. Cập nhật hoạt động cuối
    session.lastActivityAt = new Date()
    await session.save()
    return res.status(200).json({ accessToken })
  } catch (error) {
    console.error('Refresh token error:', error)
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}
export const logoutController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken
    if (!refreshToken) {
      return res.status(200).json({ message: 'Người dùng đã logout' })
    }
    await SessionModel.deleteOne({ refreshToken })
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    return res.status(200).json({ message: 'Logout thành công' })
  } catch (error) {
    console.error('Logout error:', error)
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

export const logoutAllController = async (req: Request, res: Response) => {
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
    console.error('Logout all error:', error)
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

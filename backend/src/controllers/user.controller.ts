import { NextFunction, Request, Response } from 'express'
import UserModel from '~/models/user.model.js'
import bcrypt from 'bcrypt'
import { AppError } from '~/utils/AppError.js'

// Lấy thông tin profile của người dùng || xử lí cho f5
export const getProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId
    const user = await UserModel.findById(userId).select('-isActive -deletedAt')
    if (!user) {
      throw new AppError('Không tìm thấy người dùng', 404)
    }
    return res.status(200).json({
      data: user,
      message: 'Lấy thông tin người dùng thành công'
    })
  } catch (error) {
    next(error)
  }
}

// Thêm người dùng mới (admin tạo)
export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const {
      fullname,
      username,
      phoneNumber,
      address,
      university,
      email,
      password,
      avatarUrl,
      role,
      gender,
      dateOfBirth
    } = req.body

    // Check trùng
    const existedUser = await UserModel.findOne({
      $or: [{ email }, { username }]
    })
    if (existedUser) {
      console.error('[createUserController][existedUser] : Email hoặc username đã tồn tại')
      return res.status(400).json({ message: 'Email hoặc username đã tồn tại' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await UserModel.create({
      fullname,
      username,
      email,
      passwordHash,
      phoneNumber,
      address,
      university,
      avatarUrl,
      role,
      gender,
      dateOfBirth
    })

    return res.status(201).json({
      data: user,
      message: 'Tạo user thành công'
    })
  } catch (error) {
    console.error('[createUserController][error] : ', error)
    return res.status(500).json({ message: 'Lỗi hệ thống' })
  }
}

export const getUsersController = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const users = await UserModel.find({ isDeleted: false })
    return res.status(200).json({
      data: users,
      message: 'Lấy danh sách user thành công'
    })
  } catch (error) {
    next(error)
  }
}

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const user = await UserModel.findOne({
      _id: id,
      isDeleted: false
    })
    if (!user) {
      throw new AppError('User không tồn tại', 404)
    }
    return res.status(200).json({
      data: user,
      message: 'Lấy user theo idthành công'
    })
  } catch (error) {
    next(error)
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { fullname, phoneNumber, address, university, avatarUrl, gender } = req.body

    const user = await UserModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        fullname,
        phoneNumber,
        address,
        university,
        avatarUrl,
        gender
      },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại' })
    }

    return res.status(200).json({
      data: user,
      message: 'Cập nhật user thành công'
    })
  } catch (error) {
    console.error('updateUser error:', error)
    return res.status(500).json({ message: 'Lỗi server' })
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await UserModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
        isActive: false,
        deletedAt: new Date()
      },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại' })
    }

    return res.status(200).json({
      message: 'Xóa user thành công'
    })
  } catch (error) {
    console.error('deleteUser error:', error)
    return res.status(500).json({ message: 'Lỗi server' })
  }
}

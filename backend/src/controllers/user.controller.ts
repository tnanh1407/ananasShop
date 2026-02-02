import { Request, Response } from 'express'
import UserModel from '~/models/user.model.js'
import bcrypt from 'bcrypt'

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const user = await UserModel.findById(userId).select('-isActive -deletedAt')
    console.log('check point 1 ', user)
    if (!user) return res.status(404).json({ message: 'User không tồn tại' })
    res.status(200).json({ user, message: 'Lấy dữ liệu thành công' })
  } catch (error) {
    console.error('Lỗi getProfileController :  ', error)
  }
}

export const createUserController = async (req: Request, res: Response) => {
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
    console.error('createUser error:', error)
    return res.status(500).json({ message: 'Lỗi server' })
  }
}

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find({ isDeleted: false })

    return res.status(200).json({
      data: users,
      message: 'Lấy danh sách user thành công'
    })
  } catch (error) {
    console.error('getUsers error:', error)
    return res.status(500).json({ message: 'Lỗi server' })
  }
}

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await UserModel.findOne({
      _id: id,
      isDeleted: false
    })

    if (!user) {
      return res.status(404).json({ message: 'User không tồn tại' })
    }

    return res.status(200).json({
      data: user,
      message: 'Lấy user thành công'
    })
  } catch (error) {
    console.error('getUserById error:', error)
    return res.status(500).json({ message: 'Lỗi server' })
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

import z from 'zod'

export const userBaseSchema = z.object({
  fullname: z.string().min(1, 'Họ tên không được để trống'),
  username: z.string().min(3, 'Username ít nhất 3 ký tự').toLowerCase(),
  email: z.string().email('Email không hợp lệ').toLowerCase(),
  phoneNumber: z.string().regex(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  address: z.string().optional(),
  university: z.string().optional(),
  avatarUrl: z.string().url('Link ảnh không hợp lệ').optional(),
  dateOfBirth: z.coerce.date().optional() // Tự động convert string sang Date
})
export type UserBaseInput = z.infer<typeof userBaseSchema>

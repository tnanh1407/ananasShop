import { z } from 'zod'

const baseUserShema = z
  .object({
    firstName: z.string().trim().min(1, 'Firstname không được để trống'),
    lastName: z.string().trim().min(1, 'Lastname không được để trống'),
    userName: z
      .string()
      .trim()
      .toLowerCase()
      .min(6, 'Username phải có ít nhất 6 kí tự')
      .refine((val) => !val.includes(' '), 'Username không được có khoảng trắng ở giữa'),
    email: z.string().trim().email('Email không hợp lệ'),
    password: z
      .string()
      .trim()
      .min(6, 'Password phải có ít nhất 6 kí tự')
      .regex(/[A-Z]/, 'Password phải chứa ít nhất 1 chữ cái viết hoa')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password phải chứa ít nhất 1 ký tự đặc biệt')
  })
  .strict()

export const registerShema = baseUserShema
  .extend({
    confirmPassword: z.string().trim().min(6, 'Xác nhận mật khẩu không hợp lệ')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })
  .transform((data) => ({
    ...data,
    fullName: `${data.firstName} ${data.lastName}`
  }))

export const addUserOfFunctionAdmin = baseUserShema
  .extend({
    role: z.enum(['admin', 'user', 'superadmin']).default('user'),
    gender: z.enum(['male', 'female', 'other']).default('other'),
    dateOfBirth: z.string().nullable().default(null),
    address: z.string().nullable().default(null),
    university: z.string().nullable().default(null),
    avatarUrl: z.string().nullable().default(null),
    phoneNumber: z.string().nullable().default(null)
  })
  .transform((data) => ({
    ...data,
    fullName: `${data.firstName} ${data.lastName}`
  }))

// Type
export type RegisterInput = z.infer<typeof registerShema>
export type AddUserOfFunctionAdminInput = z.infer<typeof addUserOfFunctionAdmin>
import { z } from 'zod'

export const registerSchema = z
  .object({
    firstname: z.string().min(1, 'Firstname không được để trống'),
    lastname: z.string().min(1, 'Lastname không được để trống'),
    username: z.string().min(3, 'Username ít nhất 3 ký tự').toLowerCase(),
    email: z.string().email('Email không hợp lệ').toLowerCase(),
    password: z.string().min(6, 'Mật khẩu ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Xác nhận mật khẩu không hợp lệ')
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword']
  })
  .transform((data) => ({
    ...data,
    fullname: `${data.firstname} ${data.lastname}`
  }))

export type RegisterInput = z.infer<typeof registerSchema>

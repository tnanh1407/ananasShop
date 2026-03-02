// Import packages
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import MongoDB from './config/MongoDB.js'

// Import routes
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

// Import middlewares
import { authMiddleware } from './middlewares/auth.middleware.js'
import { errorHandler } from './middlewares/error.middleware.js'
import { AppError } from './utils/AppError.js'

// 1. Cấu hình cho các biến môi trường
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4953

// 2. Middlewares
app.use(express.urlencoded({ extended: true })) // Cho phép server đọc dữ liệu từ form submit
app.use(helmet()) // Bảo mật header
app.use(express.json()) // Cho phép server đọc dữ liệu JSON từ request body

// 3. Kết nối MongoDB
MongoDB()

// 4. Mount routers
app.use('/api/auth', authRoutes)
app.use('/api/user', authMiddleware, userRoutes)
app.use('*', (req, res, next) => {
  next(new AppError('API route không tồn tại ', 404))
})
app.use(errorHandler) // xử lí lỗi global
// 5. Khởi chạy Server
app.listen(PORT, () => {
  console.log(`-----------------------------------------`)
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`)
  console.log(`-----------------------------------------`)
})

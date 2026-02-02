import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import MongoDB from './config/MongoDB.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import { authMiddleware } from './middlewares/auth.middleware.js'

// 1. Cấu hình cho các biến môi trường
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4953

// 2. Middleware
app.use(helmet()) // Bảo mật header
app.use(express.json()) // Cho phép server đọc dữ liệu JSON từ request body

// 3. Kết nối MongoDB
MongoDB()

// 4. Mount routers
app.use('/api/auth', authRoutes)
app.use('/api/user', authMiddleware, userRoutes)

// 5. Khởi chạy Server
app.listen(PORT, () => {
  console.log(`-----------------------------------------`)
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`)
  console.log(`-----------------------------------------`)
})

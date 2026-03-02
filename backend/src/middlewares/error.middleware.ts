import { Request, Response } from 'express'
import { AppError } from '~/utils/AppError.js'

export const errorHandler = (err: any, req: Request, res: Response) => {
  console.error('------ ERROR ------')
  console.error('Time:', new Date().toISOString())
  console.error('Method:', req.method)
  console.error('URL:', req.originalUrl)
  console.error('IP:', req.ip)
  console.error('Stack:\n', err.stack)

  const statusCode = err instanceof AppError ? err.statusCode : 500

  return res.status(statusCode).json({
    status: statusCode >= 500 ? 'error' : 'fail',
    message: process.env.NODE_ENV === 'production' && statusCode === 500 ? 'Internal Server Error' : err.message
  })
}

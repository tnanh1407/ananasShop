export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean
  constructor(onmessage: string, statusCode: number) {
    super(onmessage)
    this.statusCode = statusCode
    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }
}

import { Schema, model, InferSchemaType } from 'mongoose'
import { v4 as uuidv4 } from 'uuid' // v4 tạo UUID ngẫu nhiên

// MONGOOSE SCHEMA (Định nghĩa cấu trúc lưu trữ DB) ---
const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false }, // Luôn ẩn khi query
    phoneNumber: { type: String, unique: true, sparse: true }, // sparse cho phép null nhưng vẫn unique
    address: { type: String, default: '' },
    university: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user'
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      default: 'other'
    },
    dateOfBirth: { type: Date, default: '' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt (datetime)
    toJSON: {
      virtuals: true,
      versionKey: true, // tự động xóa phiên bản
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (_doc, ret: any) => {
        ret.id = ret._id
        delete ret._id
        delete ret.passwordHash
        if (ret.isDeleted) delete ret.deletedAt
        return ret
      }
    }
  }
)

userSchema.index({ email: 1, username: 1 })

export type UserType = InferSchemaType<typeof userSchema>
const UserModel = model<UserType>('User', userSchema)

export default UserModel

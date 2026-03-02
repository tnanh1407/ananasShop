import { Schema, model, InferSchemaType } from 'mongoose'
import { v4 as uuidv4 } from 'uuid' // v4 tạo UUID ngẫu nhiên

// MONGOOSE SCHEMA (Định nghĩa cấu trúc lưu trữ DB) ---
const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true, select: false }, // Luôn ẩn khi query
    phoneNumber: { type: String, unique: true, sparse: true }, // sparse cho phép null nhưng vẫn unique
    address: { type: String, default: null },
    university: { type: String, default: null },
    avatarUrl: { type: String, default: null },
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
    dateOfBirth: { type: Date, default: null },
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

userSchema.index({ userName: 1 }, { unique: true })
userSchema.index({ email: 1 }, { unique: true })

export type UserType = InferSchemaType<typeof userSchema>
const UserModel = model<UserType>('User', userSchema)

export default UserModel

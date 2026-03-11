import { create } from 'domain'
import { NextFunction } from 'express'
import { Schema, model, InferSchemaType, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid' // v4 tạo UUID ngẫu nhiên
import { extend } from 'zod/mini'

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },
    fullName: { type: String },
    username: { type: String, unique: true, trim: true },
    email: { type: String, unique: true, lowercase: true },
    passwordHash: { type: String, select: false, default: null }, // Luôn ẩn khi query
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
    deletedAt: { type: Date, default: null },
    emailVerified: {
      type: Boolean,
      default: false
    },
    lastLoginAt: {
      type: Date,
      default: null
    },
    socialLogin: [
      {
        provider: {
          type: String,
          enum: ['google', 'facebook']
        },
        providerId: {
          type: String
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    address: [
      {
        fullNameAddress: { type: String, trim: true, required: true },
        phoneNumber: { type: String, trim: true, required: true },
        province: { type: String, required: true, trim: true },
        district: { type: String, required: true, trim: true },
        ward: { type: String, required: true, trim: true },
        addressDetail: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true, default: 'Vietnam' },
        isDefault: { type: Boolean, default: false },
        postalCode: { type: String, trim: true }
      }
    ],
    PasswordHistory: [{ passwordHash: { type: String }, createdAt: { type: Date, default: Date.now } }]
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
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


userSchema.index({ 'socialLogin.provider': 1, 'socialLogin.providerId': 1 })
userSchema.index({ username: 1 }, { unique: true })
userSchema.index({ email: 1 }, { unique: true })

export type UserType = InferSchemaType<typeof userSchema>
export const UserModel = model<UserType>('User', userSchema)

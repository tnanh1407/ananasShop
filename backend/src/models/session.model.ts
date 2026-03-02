import { Schema, model, InferSchemaType } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const sessionSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuidv4
    },

    userId: {
      type: String,
      ref: 'User',
      required: true,
      index: true
    },

    refreshToken: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    ipAddress: {
      type: String,
      required: true
    },

    userAgent: {
      type: String,
      required: true
    },

    expiredAt: {
      type: Date,
      required: true
    },

    lastActivityAt: {
      type: Date,
      default: Date.now
    },

    // 🔥 Level 3 security
    isRevoked: {
      type: Boolean,
      default: false
    },

    replacedByToken: {
      type: String,
      default: null
    }
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false
    },
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: any) => {
        ret.id = ret._id
        delete ret._id
        return ret
      }
    }
  }
)

// 🔥 TTL index: tự động xoá session khi expiredAt đến hạn
sessionSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 })

export type SessionType = InferSchemaType<typeof sessionSchema>

const SessionModel = model<SessionType>('Session', sessionSchema)

export default SessionModel
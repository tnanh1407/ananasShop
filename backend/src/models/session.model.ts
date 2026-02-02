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
      required: true,
      index: true
    },

    lastActivityAt: {
      type: Date,
      default: Date.now
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transform: (_doc, ret: any) => {
        ret.id = ret._id
        delete ret._id
        return ret
      }
    }
  }
)

// TTL index → tự xoá session khi hết hạn
sessionSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 })

export type SessionType = InferSchemaType<typeof sessionSchema>

const SessionModel = model<SessionType>('Session', sessionSchema)

export default SessionModel

import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  service: string;
  metadata?: Record<string, any>;
  userId?: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema(
  {
    level: {
      type: String,
      enum: ['info', 'warn', 'error', 'debug'],
      required: true,
      index: true,
    },
    message: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
      index: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    userId: {
      type: String,
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index - automatically delete logs older than 30 days
LogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

export const Log = mongoose.model<ILog>('Log', LogSchema);

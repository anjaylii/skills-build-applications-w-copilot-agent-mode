import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
}

const ActivitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  date: { type: Date, default: () => new Date() }
});

export default mongoose.model<IActivity>('Activity', ActivitySchema);

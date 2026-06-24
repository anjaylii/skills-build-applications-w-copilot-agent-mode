import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description?: string;
  exercises: { name: string; reps?: number; sets?: number }[];
  durationMinutes?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  description: { type: String },
  exercises: [{ name: String, reps: Number, sets: Number }],
  durationMinutes: { type: Number },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] }
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);

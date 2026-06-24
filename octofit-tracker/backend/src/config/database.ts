import mongoose from 'mongoose';

const DEFAULT_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(uri: string = DEFAULT_URI) {
  return mongoose.connect(uri);
}

export default mongoose;

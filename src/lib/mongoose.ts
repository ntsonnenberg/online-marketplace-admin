import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const url = process.env.MONGODB_URL as string;

    return mongoose.connect(url);
  }
}

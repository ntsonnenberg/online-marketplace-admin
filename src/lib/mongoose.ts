import mongoose, { Date } from "mongoose";

export type Data = {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const url = process.env.MONGODB_URL as string;

    return mongoose.connect(url);
  }
}

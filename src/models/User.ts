import { Schema, models, model } from "mongoose";

export interface User {
  _id: string;
  name?: string;
  email: string;
  emailVerified?: string;
  source?: string;
}

const UserSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
    },
    password: String,
    image: String,
    emailVerified: String,
    source: String,
  },
  {
    timestamps: true,
  }
);

export const User = models?.User || model("User", UserSchema);

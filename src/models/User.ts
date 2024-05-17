import mongoose, { Schema } from "mongoose";

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

const User = mongoose.models.User ?? mongoose.model("User", UserSchema);

export default User;

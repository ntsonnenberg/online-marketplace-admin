import mongoose, { Schema, model, models } from "mongoose";
import { Product } from "./Product";

export interface HomePage {
  _id: string;
  about: string;
  mission: string;
  featured: Product[];
  video: string | null;
  vendor: string;
}

const HomePageSchema = new Schema(
  {
    about: { type: String, required: true },
    mission: { type: String, required: true },
    featured: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
    video: String,
    vendor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

export const HomePage = models?.HomePage || model("HomePage", HomePageSchema);

import mongoose, { Schema, model, models } from "mongoose";
import { Category, Property } from "./Category";

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string | null;
  properties?: any;
  vendor: string;
}

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    vendor: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Product = models?.Product || model("Product", ProductSchema);

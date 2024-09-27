import mongoose, { Schema, model, models } from "mongoose";

export interface Property {
  _id: string;
  name: string;
  values: string[];
}

export interface Parent {
  _id: string;
  name: string;
  properties: Property[] | null;
}

export interface Category {
  _id: string;
  name: string;
  parent: Parent | null;
  properties: Property[];
}

const PropertySchema = new Schema({
  name: String,
  values: [String],
});

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [PropertySchema],
  },
  {
    timestamps: true,
  }
);

export const Category = models?.Category || model("Category", CategorySchema);

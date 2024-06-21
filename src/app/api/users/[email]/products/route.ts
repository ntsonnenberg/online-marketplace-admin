import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  email: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    await mongooseConnect();
    const email = context.params.email;
    const user = await User.findOne({ email }).select("-password -source");

    if (user) {
      const products = await Product.find({ vendor: user._id });
      return NextResponse.json(products, { status: 200 });
    }
    throw new Error(`User with email ${email} does not exist.`);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Could not get products.",
          description: error?.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Could not get products." },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest, context: { params: Params }) {
  try {
    await mongooseConnect();
    const email = context.params.email;
    const user = await User.findOne({ email }).select("-password -source");

    if (user) {
      const { title, description, price, category, properties } =
        await req.json();
      const product = await Product.create({
        title,
        description,
        price,
        category,
        properties,
        vendor: user._id,
      });
      return NextResponse.json(product, { status: 201 });
    }
    throw new Error(`User with email ${email} does not exist.`);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Could not create product.",
          description: error?.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Could not create product." },
      { status: 400 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { Product } from "@/models/Product";

type Params = {
  email: string;
  id: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    await mongooseConnect();
    const { email, id } = context.params;
    const user = await User.findOne({ email }).select("-password -source");

    if (user) {
      const product = await Product.findOne({ _id: id, vendor: user._id });
      return NextResponse.json(product, { status: 200 });
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

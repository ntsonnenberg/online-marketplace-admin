import { mongooseConnect } from "@/lib/mongoose";
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
      return NextResponse.json(user, { status: 200 });
    }
    throw new Error(`User with email ${email} does not exist.`);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Could not get user.",
          description: error?.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Could not get user." }, { status: 400 });
  }
}

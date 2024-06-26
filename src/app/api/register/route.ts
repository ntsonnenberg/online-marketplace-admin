import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new Error("Email or password not provided.");
    }

    await mongooseConnect();

    if (await User.findOne({ email })) {
      throw new Error(`User with email ${email} already exists.`);
    }

    const user = await User.create({ email, password, source: "credentials" });

    if (user) {
      return NextResponse.json(user, { status: 201 });
    }

    throw new Error("User was not created.");
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Could not register user.",
          description: error?.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Could not register user." },
      { status: 400 }
    );
  }
}

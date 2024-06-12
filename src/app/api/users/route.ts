import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await mongooseConnect();
    const users = await User.find({});

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not get users.",
        description: error,
      },
      { status: 400 }
    );
  }
}

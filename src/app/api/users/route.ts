import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    const client = await clientPromise;
    const db = client.db("marketplace-db");

    if (email) {
      const users = await db.collection("users").find({ email });
      return NextResponse.json(users, { status: 200 });
    }
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

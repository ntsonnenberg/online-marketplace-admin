import { s3Client, Bucket } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("company-video") as File;

  if (!file) {
    return NextResponse.json(
      {
        error: "Could not upload file.",
        description: "No file recieved.",
      },
      { status: 400 }
    );
  }

  try {
    const Body = (await file.arrayBuffer()) as Buffer;
    s3Client.send(
      new PutObjectCommand({
        Bucket,
        Key: `vendor-videos/${file.name}`,
        Body,
      })
    );

    const link = `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/vendor-videos/${file.name}`;

    return NextResponse.json({ link }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not upload file.",
        description: error,
      },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {}

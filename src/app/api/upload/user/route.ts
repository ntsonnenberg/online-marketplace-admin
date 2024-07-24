import { s3Client, Bucket } from "@/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("file") as File[];

  if (!files) {
    return NextResponse.json(
      { error: "Could not upload file.", description: "No file recieved." },
      { status: 400 }
    );
  }

  try {
    const Body = (await files[0].arrayBuffer()) as Buffer;
    s3Client.send(
      new PutObjectCommand({
        Bucket,
        Key: `vendor-logos/${files[0].name}`,
        Body,
      })
    );

    const links = [
      `https:///${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/vendor-logos/${files[0].name}`,
    ];

    return NextResponse.json({ links }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not upload file.", description: error },
      { status: 400 }
    );
  }
}

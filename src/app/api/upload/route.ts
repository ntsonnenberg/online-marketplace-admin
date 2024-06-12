import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, Bucket } from "@/lib/s3";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files = formData.getAll("file") as File[];

  if (!files) {
    return NextResponse.json(
      { error: "Could not upload file.", description: "No files recieved." },
      { status: 400 }
    );
  }

  try {
    let links = [];

    for (const file of files) {
      const Body = (await file.arrayBuffer()) as Buffer;
      s3Client.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));

      const link = `https://${Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.name}`;
      links.push(link);
    }

    return NextResponse.json({ links }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Could not upload file.", description: error },
      { status: 400 }
    );
  }
}

import { Bucket, s3Client } from "@/lib/s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  key: string;
};

export async function DELETE(req: NextRequest, context: { params: Params }) {
  const { key } = context.params;

  if (!key) {
    return NextResponse.json({
      error: "Could not delete file.",
      description: "No file key.",
    });
  }

  try {
    s3Client.send(
      new DeleteObjectCommand({ Bucket, Key: `vendor-videos/${key}` })
    );

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: `Could not delete file with key ${key}.`,
        description: error,
      },
      { status: 400 }
    );
  }
}

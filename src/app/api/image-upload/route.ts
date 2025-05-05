import { auth } from "@/auth/auth";
import { env } from "@/env";
import cloudinary from "@/cloudinary/cloudinary";
import { generateSuffixId } from "@/lib/utils";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export interface ImageUploadResult {
  public_id: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  // authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch the file from request
  const formData = await request.formData();
  const rawFilename = formData.get("filename") as string;
  const sanitizedName = rawFilename?.split(".")[0]; // remove extension
  const suffixId = generateSuffixId();
  const customPublicId = `${sanitizedName}_${suffixId}`;
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Convert the file to an ArrayBuffer - this is a way to represent binary data
  const bytes = await file.arrayBuffer(); // will be in Binary Data - bytes
  // console.log("BYTES->>", bytes);
  // Create a Node.js Buffer from the ArrayBuffer - Buffer is Node's way of handling binary data
  // We need this format to upload to Cloudinary
  const buffer = Buffer.from(bytes);
  // console.log("BUFFER->>", buffer);

  try {
    // Upload to cloudinary
    const result = await new Promise<ImageUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: env.CLOUDINARY_FOLDER_NAME,
            public_id: customPublicId,
            unique_filename: true,
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result as ImageUploadResult);
            }
          },
        );
        uploadStream.end(buffer);
      },
    );

    return NextResponse.json({
      public_id: result.public_id,
    }, { status: 200 });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ error: "Failed to upload image" }, {
      status: 500,
    });
  }
}

import { v2 as cloudinary } from "cloudinary";
import config from "./config";

cloudinary.config(config.cloudinary);

export const uploadVideoToCloudinary = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "video" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      uploadStream.end(buffer);
    };
  });
};

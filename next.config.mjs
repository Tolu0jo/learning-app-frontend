/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_BASE_URL: process.env.NEXT_BASE_URL,
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    },
    images: {
      remotePatterns: [
    
      ],
    },
  };
  
  export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_BASE_URL: process.env.NEXT_BASE_URL,
    },
    images: {
      remotePatterns: [
    
      ],
    },
  };
  
  export default nextConfig;
  
const config = {
    baseUrl:   process.env.NEXT_BASE_URL ,
    paystack:{
      public_key:  process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    },
    cloudinary:{
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  
    }
  };
  
  export default config;
  
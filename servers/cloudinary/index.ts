import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({ 
    cloud_name: 'di8y1k4w0', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    // secure: true
  });

  export default cloudinary
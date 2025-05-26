import multer from "multer";

// 'this is storage engine for multer', specifically made for uploading files directly to Cloudinary
// instead of saving them locally
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Instance of storage enginer - CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary, // this tells storage engine which Cloudinary account to use
  params: async (req, file) => ({
    folder: "channel_uploads",
    allowedFormats: ["jpg", "png", "jpeg"],
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const upload = multer({ storage });

export default upload;

/*
 params function - It gives Cloudinary instruction on how to handle the incoming file. This function 
will return a configuration object something like this:

{
  asset_id: "abc123...",
  public_id: "channel_uploads/1710000000000-logo.png",
  secure_url: "https://res.cloudinary.com/<cloud-name>/image/upload/v1710000000/channel_uploads/1710000000000-logo.png",
  url: "http://res.cloudinary.com/<cloud-name>/image/upload/v1710000000/channel_uploads/1710000000000-logo.png",
  // ... more metadata
}

*/

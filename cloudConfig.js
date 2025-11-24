const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// 👇 Yaha hard-code test kar rahe hain
cloudinary.config({
  cloud_name: "duaowwzm5",  // ← yaha direct naam likha
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "StayHub"
  },
});

module.exports = { cloudinary, storage };

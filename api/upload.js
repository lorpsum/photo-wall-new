export default async function handler(req, res) {
  // 1) CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2) Handle OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 3) Only POST
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { image } = req.body;

    const cloudinary = require("cloudinary").v2;

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "mur_photos",
    });

    return res.status(200).json({ url: uploadResponse.secure_url });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

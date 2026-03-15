import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body; // ton front envoie base64

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Upload vers Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "photo-wall", // toutes les images vont dans ce dossier
      quality: "auto",
      fetch_format: "auto",
    });

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

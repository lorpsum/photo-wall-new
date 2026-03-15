import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image } = req.body; // base64 envoyé par Shopify

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    // Upload vers Cloudinary dans le dossier "photo-wall"
    const result = await cloudinary.uploader.upload(image, {
      folder: "photo-wall",
      quality: "auto",
      fetch_format: "auto",
    });

    // Renvoie l'URL directe pour le front
    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

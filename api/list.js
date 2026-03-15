import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    // Récupère toutes les images uploadées dans le dossier "photo-wall" (ou racine si tu n'en mets pas)
    const result = await cloudinary.api.resources({ type: "upload", prefix: "photo-wall", max_results: 100 });

    // Transforme en tableau d'URLs
    const images = result.resources.map(img => img.secure_url);

    res.status(200).json({ images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

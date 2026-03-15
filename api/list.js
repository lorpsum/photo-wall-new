import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function handler(req, res) {
  try {
    // Récupère toutes les images dans le dossier "photo-wall"
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "photo-wall",
      max_results: 100,
      sort_by: [{ field: "created_at", order: "desc" }] // les plus récentes en premier
    });

    // Transforme en tableau d'URLs
    const images = result.resources.map(img => img.secure_url);

    res.status(200).json({ images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

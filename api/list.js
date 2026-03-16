import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export default async function handler(req, res) {
  // 🔹 CORS : autoriser Shopify à fetcher depuis le navigateur
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // OPTIONS preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "mur_photos",   // ton dossier Cloudinary
      max_results: 100,
      sort_by: [{ field: "created_at", order: "desc" }]
    });

    const images = result.resources.map(img => img.secure_url);
    res.status(200).json({ images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

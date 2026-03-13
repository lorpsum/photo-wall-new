export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const cloudinary = require("cloudinary").v2;

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const result = await cloudinary.search
      .expression("folder:mur_photos")
      .sort_by("created_at", "desc")
      .max_results(500)
      .execute();

    const images = result.resources.map(r => r.secure_url);

    return res.status(200).json({ images });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

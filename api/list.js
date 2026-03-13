export default function handler(req, res) {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "data/images.json");

  try {
    const raw = fs.readFileSync(filePath);
    const images = JSON.parse(raw);
    res.status(200).json({ images });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

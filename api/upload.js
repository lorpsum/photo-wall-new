export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(process.cwd(), "data/images.json");

  try {
    const body = req.body;
    if (!body.url) return res.status(400).json({ message: "Missing URL" });

    const raw = fs.readFileSync(filePath);
    const images = JSON.parse(raw);

    images.push(body.url);
    fs.writeFileSync(filePath, JSON.stringify(images, null, 2));

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

import {cloudinary} from "../../../cloudinary"

export default async function handler(req, res) {
    if (req.method === "POST") {
      const { image } = req.body;
  
      try {
        const result = await cloudinary.uploader.upload(image, {
          upload_preset: "ryexjkp1",
        });
  
        res.status(200).json({ imageUrl: result.secure_url });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error uploading image" });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  }
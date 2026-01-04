import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));
app.use("/files", express.static(path.join(__dirname, "upload")));

const storage = multer.diskStorage({
  destination: "upload/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "Uploaded", file: req.file.filename });
});

app.get("/all-files", (req, res) => {
  fs.readdir("upload", (err, files) => {
    if (err) return res.json([]);
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

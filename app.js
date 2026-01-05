import express from "express";
import multer, { diskStorage } from "multer";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Configure Multer to specify where to store uploaded files and the file name
const storage = diskStorage({
  destination: (req, file, cb) => {
    // Specify the directory where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Specify how the file should be named
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Define a route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // File has been uploaded successfully
  res.sendFile(__dirname + "/submitted.html");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

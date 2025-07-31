import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { uploadResume } from "../controllers/postSignupEmp2Controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../../resumeStorage")),
  filename: (req, file, cb) => {
    const user = (req.body.username || "unknown").trim();
    const ext  = path.extname(file.originalname);  
    
    cb(null, `${user}Resume${ext}`);
  },
});
const upload = multer({ storage });

router.post("/upload-resume", upload.single("resume"), uploadResume);

export default router;
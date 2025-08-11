import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/postSignupEmp2Controller.js";
import fs from "node:fs";

const router = express.Router();

// Ensure Resume folder exists
const resumeDir = "src/ResumeUploads/";
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

// Multer config for resume upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resumeDir);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const username = req.body.username || "User";
    cb(null, `${username.replace(/[^a-zA-Z0-9]/g, "")}_Resume.${ext}`);
  },
});
const upload = multer({ storage });

router.post("/post-signup-emp2/upload-resume", upload.single("resume"), uploadResume);

export default router;
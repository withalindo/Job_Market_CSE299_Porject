import express from "express";
import multer from "multer";
import { addCompanyInfo } from "../controllers/postSignupComController.js";
import fs from "node:fs";

const router = express.Router();

// Ensure CompanyImage folder exists
const imageDir = "src/CompanyImage/";
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Multer config with custom destination and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    let companyName = req.body.companyName || "Company";
    companyName = companyName.replace(/[^a-zA-Z0-9]/g, "");
    cb(null, `${companyName}Image.${ext}`);
  },
});
const upload = multer({ storage });

router.post("/post-signup-com/add-info", upload.single("companyLogo"), addCompanyInfo);

export default router;
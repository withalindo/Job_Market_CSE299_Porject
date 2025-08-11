import express from "express";
import { postJob } from "../controllers/JobPostController.js";

const router = express.Router();

router.post("/post-job", postJob);

export default router;
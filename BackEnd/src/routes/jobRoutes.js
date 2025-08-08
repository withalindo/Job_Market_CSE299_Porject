import express from "express";
import { getJobs } from "../controllers/jobController.js";

const router = express.Router();

// GET /api/jobs?search=...&category=...
router.get("/jobs", getJobs);

export default router;
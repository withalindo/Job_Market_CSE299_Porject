import express from "express";
import { getTopEmployees, getTopJobsBySalary } from "../controllers/LandPage3Controller.js";

const router = express.Router();

router.get("/top-employees", getTopEmployees);
router.get("/top-jobs", getTopJobsBySalary);

export default router;

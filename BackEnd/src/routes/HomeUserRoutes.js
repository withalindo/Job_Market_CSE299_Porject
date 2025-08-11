import express from "express";
import {
  getHomeUserInfo,
  getTopJobsBySkills,
  getAllJobs,
  getAllEmployees,
} from "../controllers/HomeUserController.js";

const router = express.Router();


router.get("/all-jobs", getAllJobs);
router.get("/employees", getAllEmployees);
router.get("/homeuser-info", getHomeUserInfo);
router.get("/top-jobs", getTopJobsBySkills);

export default router;
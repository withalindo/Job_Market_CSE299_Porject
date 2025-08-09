import express from "express";
import {
  getHomeUserInfo,
  getTopJobs,
  getJobsForYou,
  getTopEmployees,
} from "../controllers/homeUserController.js";

const router = express.Router();

router.get("/homeuser-info", getHomeUserInfo);
router.get("/top-jobs", getTopJobs);
router.get("/jobs-for-you", getJobsForYou);
router.get("/top-employees", getTopEmployees);

export default router;
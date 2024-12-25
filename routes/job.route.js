import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getjobbyid,
  jobpost,
} from "../controller/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, jobpost);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getjobbyid);

export default router;

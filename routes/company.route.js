import express from "express";
import {
  getcompany,
  getcompanyid,
  registercompany,
  updateCompany,
} from "../controller/company.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registercompany); // User Registration
router.route("/get").get(isAuthenticated, getcompany); // User Login
router.route("/get/:id").get(isAuthenticated, getcompanyid); // User Logout
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

export default router;

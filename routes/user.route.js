import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
// In your controller or route file
import singleUpload from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register); // User Registration
router.route("/login").post(login); // User Login
router.route("/logout").get(logout); // User Logout
router
  .route("/profile/update")
  .post(singleUpload, isAuthenticated, updateProfile);
export default router;

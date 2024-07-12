import express from "express";
import {
  addProject,
  contactUs,
  deleteMessage,
  deleteProject,
  logOut,
  myProfile,
  project,
  replyMessage,
  signIn,
  signup,
  updateProfile,
  updateProject,
  verifyEmail,
} from "../controllers/user-controllers.js";
import { isAutheticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/signin", signIn);
router.post("/contactus", contactUs);
router.get("/project", project);
router.get("/logout", isAutheticated, logOut);

router.get("/profile", isAutheticated, myProfile);
router.put("/profile/update", isAutheticated, updateProfile);
router.post("/add-project", isAutheticated, addProject);
router.delete("/project/:id", isAutheticated, deleteProject);
router.put("/project/:id", isAutheticated, updateProject);
router.delete("/message/:id", isAutheticated, deleteMessage);
router.post("/message/:id", isAutheticated, replyMessage);

export default router;

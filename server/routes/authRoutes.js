import { Router } from "express";

import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/me", authMiddleware, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;

import express from "express";
import {
  getAllColleges,
  getSingleCollege,
  registerCollege,
} from "../controllers/collegeController.js";

const router = express.Router();

router.post("/register", registerCollege);
router.get("/", getAllColleges);
router.get("/:slug", getSingleCollege);

export default router;
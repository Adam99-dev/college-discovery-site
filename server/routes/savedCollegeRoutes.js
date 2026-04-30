import express from "express";

import {
  saveCollege,
  getSavedColleges,
  removeSavedCollege,
} from "../controllers/savedCollegeController.js";

const router = express.Router();

router.post("/", saveCollege);

router.get("/:userId", getSavedColleges);

router.delete("/", removeSavedCollege);

export default router;
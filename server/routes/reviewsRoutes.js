import express from "express";

import { getCollegeReviews } from "../controllers/reviewsController.js";

const router = express.Router();

router.get("/:slug", getCollegeReviews);

export default router;
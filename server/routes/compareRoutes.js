import express from "express";
import { compareColleges } from "../controllers/compareController.js";

const router = express.Router();

router.get("/", compareColleges);

export default router;
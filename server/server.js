import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import collegeRoutes from "./routes/collegeRoutes.js";
import compareRoutes from "./routes/compareRoutes.js";
import savedCollegeRoutes from "./routes/savedCollegeRoutes.js";

import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: "https://college-discovery-site.vercel.app",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5000;

app.use("/api/user", authRoutes);

app.use("/api/colleges", authMiddleware, collegeRoutes);

app.use("/api/compare", authMiddleware, compareRoutes);

app.use("/api/saved_colleges", authMiddleware, savedCollegeRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createVideo } from "../controllers/video.controller.js";

const router = express.Router();

// Posting video / creating video
router.post("/", verifyUser, createVideo);

export default router;

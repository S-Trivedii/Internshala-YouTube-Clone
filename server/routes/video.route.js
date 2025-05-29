import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import { createVideo, reactVideo } from "../controllers/video.controller.js";

const router = express.Router();

// Posting video / creating video
router.post("/", verifyUser, createVideo);

// Like or dislike a video
router.patch("/:videoId/react", verifyUser, reactVideo);

export default router;

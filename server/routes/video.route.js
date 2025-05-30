import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  createVideo,
  reactVideo,
  deleteVideo,
  getAllVideos,
} from "../controllers/video.controller.js";

const router = express.Router();

// Get all videos
router.get("/", getAllVideos);

// Posting video / creating video
router.post("/", verifyUser, createVideo);

// Like or dislike a video
router.patch("/:videoId/react", verifyUser, reactVideo);

// Delete video
router.delete("/:videoId", verifyUser, deleteVideo);

export default router;

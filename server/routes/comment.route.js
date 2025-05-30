import express from "express";
import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  createComment,
  getVideoComments,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// POST: /api/v1/comment/
router.post("/", verifyUser, createComment);

// GET: /api/v1/video/:videoId/comments
router.get("/video/:videoId/comments", getVideoComments);

// DELETE: /api/v1/comment/:commentId
router.delete("/:commentId", verifyUser, deleteComment);

export default router;

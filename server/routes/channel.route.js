import express from "express";
import {
  getChannelById,
  updateChannelById,
} from "../controllers/channel.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// get channel by channelId
router.get("/:channelId", getChannelById);

// update channel by channelId (with file uploads)
router.put(
  "/:channelId",
  verifyUser,
  upload.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "channelLogo", maxCount: 1 },
  ]),
  updateChannelById
);

export default router;

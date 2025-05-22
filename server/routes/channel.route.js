import express from "express";
import { getChannelById } from "../controllers/channel.controller.js";

const router = express.Router();

// get channel by channelId
router.get("/:channelId", getChannelById);

export default router;

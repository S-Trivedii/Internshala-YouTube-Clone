import { Channel } from "../model/channel.model.js";
import { Video } from "../model/video.model.js";

export const createVideo = async (req, res) => {
  try {
    const { videoTitle, videoDescription, videoUrl, channelId } = req.body;

    const userId = req.userId; // get userId from verfied token

    if (!videoTitle || !videoUrl || !channelId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    // Find the channel and check if the video uploader owns it (channel)

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res
        .status(404)
        .json({ message: "Channel not found", success: false });
    }

    // Why toString()? B'coz we are comparing objectId with string(userId)
    if (channel.owner.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to upload to this channel",
        success: false,
      });
    }

    // Create and save the video
    const newVideo = new Video({
      videoTitle,
      videoDescription,
      videoUrl,
      channelId,
      uploader: userId,
    });
    const video = await newVideo.save();

    // Update the channel’s list of videos
    channel.videos.push(video._id);
    await channel.save();

    return res.status(201).json({
      success: true,
      message: "Video post/save successfully",
      video,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, message: "Server error" });
  }
};

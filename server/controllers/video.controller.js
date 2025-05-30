import { Channel } from "../model/channel.model.js";
import { Video } from "../model/video.model.js";

// Create video or post video
export const createVideo = async (req, res) => {
  try {
    const {
      videoTitle,
      videoDescription,
      videoUrl,
      channelId,
      videoThumbnail,
    } = req.body;

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
      videoThumbnail,
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

// Like or Dislike
export const reactVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { userId, reactionType } = req.body; // 'like' or 'dislike'

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: "Video not found" });

    const existingReaction = video.reactions.find(
      (r) => r.userId.toString() === userId
    );

    if (existingReaction) {
      if (existingReaction.type === reactionType) {
        return res
          .status(400)
          .json({ message: `Already ${reactionType}d`, success: false });
      }

      // Switch from like <-> dislike
      if (existingReaction.type === "like") {
        video.likes -= 1;
        video.dislikes += 1;
      } else {
        video.likes += 1;
        video.dislikes -= 1;
      }

      existingReaction.type = reactionType;
    } else {
      // New reaction
      video.reactions.push({ userId, type: reactionType });
      if (reactionType === "like") video.likes += 1;
      else video.dislikes += 1;
    }

    await video.save();
    return res.status(200).json({
      message: "Send successfully",
      likes: video.likes,
      dislikes: video.dislikes,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

import { Channel } from "../model/channel.model.js";
import { Video } from "../model/video.model.js";

// Get all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("uploader", "username")
      .sort({ createdAt: -1 }); // Optional: newest first

    if (videos.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No videos found", videos: [] });
    }

    return res.status(200).json({ success: true, videos });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Create video or post video
export const createVideo = async (req, res) => {
  try {
    let { videoTitle, videoDescription, videoUrl, channelId, videoThumbnail } =
      req.body;

    const userId = req.userId; // get userId from verfied token

    if (!videoTitle || !videoUrl || !channelId) {
      return res
        .status(400)
        .json({ message: "Missing required fields", success: false });
    }

    if (videoThumbnail === "") {
      videoThumbnail = "http://localhost:3000/public/nature.jpg";
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

// Delete video
export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.videoId);

    // Check if video or uploader is missing
    if (!video || !video.uploader || video.uploader.toString() !== req.userId) {
      return res.status(403).json({
        message: "Not authorized to delete this video",
        success: false,
      });
    }

    await video.deleteOne();
    return res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

import { Comment } from "../model/comment.model.js";

// Create comment
export const createComment = async (req, res) => {
  try {
    const { comment, videoId } = req.body;
    const userId = req.userId;

    const newComment = await Comment.create({ comment, userId, videoId });
    res.status(201).json({ success: true, comment: newComment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all comments for particular video
export const getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await Comment.find({ videoId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

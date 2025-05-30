import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

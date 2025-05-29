import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: true,
    },
    videoDescription: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    videoThumbnail: {
      type: String,
      default: "http://localhost:3000/public/nature.jpg",
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", videoSchema);

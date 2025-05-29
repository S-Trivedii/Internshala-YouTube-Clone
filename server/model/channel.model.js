import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    bannerImage: {
      // Channel header banner
      type: String,
      default: null,
    },
    channelLogo: {
      type: String,
      default: "http://localhost:3000/public/default_channel_logo.png",
    },
    videos: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
      default: [],
    },
  },
  { timestamps: true }
);

export const Channel = mongoose.model("Channel", channelSchema);

// subscribers: [
//       {
//         // Track subscribers
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     isVerified: {
//       // For official channels
//       type: Boolean,
//       default: false,
//     },

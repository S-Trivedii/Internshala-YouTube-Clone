import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    name: {
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
    profileImage: {
      // Channel logo (separate from user avatar)
      type: String,
      default: null,
    },
    bannerImage: {
      // Channel header banner
      type: String,
      default: null,
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

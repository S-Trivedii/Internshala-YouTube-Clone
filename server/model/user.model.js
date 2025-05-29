import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username must not exceed 20 characters"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [100, "Password is too long"],
    },
    avatar: {
      type: String,
      default: null,
    },
    channels: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
      default: [],
    },
  },
  { timestamps: true }
); // Adds createdAt and updatedAt fields

export const User = mongoose.model("User", userSchema);

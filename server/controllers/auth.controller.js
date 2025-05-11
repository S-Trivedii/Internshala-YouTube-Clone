import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";

// Register controller
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email }).select("-password");

    // If user already exist
    if (user) {
      return res.status(409).json({
        message: "Account already exist with this email",
        success: false,
      });
    }

    // Password hashing
    const hashPassword = await bcrypt.hash(password, 10);

    // Creating and saving document
    await User.create({
      username,
      email,
      password: hashPassword,
    });

    // console.log("Register: ");
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // If fields are empty
    if (!email || !password) {
      return res.status(404).json({
        message: "All fields are required",
        success: false,
      });
    }

    // will only select username, password and _id
    const user = await User.findOne({ email }).select("username password _id");

    // If user doesn't exist
    if (!user) return res.status(401).json({ message: "Incorrect email" });

    // Comparing password, will return boolean value
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match
    if (!isPasswordMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // Payload
    const tokenData = {
      userId: user._id,
    };

    // Sign jwt token (token creation)
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true, // prevent JS access
        secure: process.env.NODE_ENV === "production", // set false during dev
        sameSite: "None", // necessary for cross-origin request
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({
        message: `Welcome back, ${user.username}`,
        user: { username: user.username },
        success: true,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

// Logout controller
export const logout = (req, res) => {
  try {
    // Clear the JWT token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure it works in production
      sameSite: "None",
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

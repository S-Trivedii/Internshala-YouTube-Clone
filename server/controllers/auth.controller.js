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

    const user = await User.findOne({ email });

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

    console.log("Register: ");
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

    const user = await User.findOne({ email });

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

    // Sending to token to client
    return res.status(200).json({
      message: `Welcome back, ${user.username}`,
      user,
      token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

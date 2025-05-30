import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/db.js";
import authRoutes from "./routes/auth.route.js";
import channelRoutes from "./routes/channel.route.js";
import videoRoutes from "./routes/video.route.js";
import commentRoutes from "./routes/comment.route.js";

dotenv.config();

const app = express();

// Parse application/json
app.use(bodyParser.json());

// serving static file
app.use("/public", express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie-parser
app.use(cookieParser());

// Cors
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/channel", channelRoutes);
app.use("/api/v1/video", videoRoutes);
app.use("/api/v1/comment", commentRoutes);

const PORT = process.env.PORT || 8000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

startServer();

import express from "express";
import { register, login, logout, me } from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", verifyUser, me);

export default router;

import express from "express";
import dotenv from "dotenv";
import { passportAuth, authCallback, logout, } from "../controllers/oauth-gmail.js";

dotenv.config();

const router = express.Router();

/* Redirect user to Google login */
router.get("/auth/google", passportAuth);

/* Handle Google OAuth callback */
router.get("/auth/google/callback", authCallback);

/* Handle logout */
router.get("/logout", logout);


export default router;

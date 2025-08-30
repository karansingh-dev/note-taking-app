import express from "express";
import passport from "../lib/passport.js";
import { generateJwt } from "../utils/jwt.js";

export const router = express.Router();
router.get(
  "/api/auth/google/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/api/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
      }

      // Generate JWT token
      const token = generateJwt({
        userId: req.user.id,
        email: req.user.email,
        isRegistered: req.user.isRegistered,
      });

      // Redirect to frontend with token
      res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  }
);

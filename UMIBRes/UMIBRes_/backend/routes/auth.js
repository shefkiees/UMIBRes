import express from "express";
import passport from "../config/passport.js";

const router = express.Router();
const callbackOrigin = process.env.GOOGLE_CALLBACK_URL
  ? new URL(process.env.GOOGLE_CALLBACK_URL).origin
  : null;
const clientUrl = process.env.CLIENT_URL || callbackOrigin || "http://localhost:5173";

// start login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Ridrejto tek dashboard-i i frontend-it
    res.redirect(`${clientUrl}/professor/dashboard`);
  }
);

export default router;

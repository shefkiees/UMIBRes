import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// start login
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// callback
router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Ridrejto tek dashboard-i i frontend-it
    res.redirect("http://localhost:5173/dashboard");
  }
);

export default router;

import express from "express";
import passport from "../config/passport.js";

const router = express.Router();

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  (req, res, next) => {
    console.log("CALLBACK HIT");
    next();
  },
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    console.log("LOGIN SUCCESS");
    res.redirect("/professor/dashboard");
  }
);
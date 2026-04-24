import express from "express";
import passport from "../config/passport.js";

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);

function getRequestOrigin(req) {
  const forwardedProto = req.get("x-forwarded-proto");
  const forwardedHost = req.get("x-forwarded-host");
  const host = forwardedHost || req.get("host");

  if (!host) {
    return null;
  }

  return `${forwardedProto || "https"}://${host}`;
}

function getClientUrl(req) {
  if (process.env.CLIENT_URL) {
    return process.env.CLIENT_URL;
  }

  if (process.env.GOOGLE_CALLBACK_URL) {
    return new URL(process.env.GOOGLE_CALLBACK_URL).origin;
  }

  if (isProduction) {
    return getRequestOrigin(req);
  }

  return "http://localhost:5173";
}

function getGoogleCallbackUrl(req) {
  if (process.env.GOOGLE_CALLBACK_URL) {
    return process.env.GOOGLE_CALLBACK_URL;
  }

  if (isProduction) {
    const origin = getRequestOrigin(req);
    if (origin) {
      return `${origin}/api/auth/google/callback`;
    }
  }

  return "http://localhost:5000/api/auth/google/callback";
}

// start login
router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    callbackURL: getGoogleCallbackUrl(req)
  })(req, res, next);
});

// callback
router.get("/google/callback",
  (req, res, next) => {
    passport.authenticate("google", {
      failureRedirect: getClientUrl(req),
      callbackURL: getGoogleCallbackUrl(req)
    })(req, res, next);
  },
  (req, res) => {
    // Ridrejto tek dashboard-i i frontend-it
    res.redirect(`${getClientUrl(req)}/professor/dashboard`);
  }
);

export default router;

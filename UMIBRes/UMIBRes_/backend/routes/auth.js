import express from "express";
import passport from "../config/passport.js";
import { googleAuthConfigured } from "../config/passport.js";

const router = express.Router();
const isProduction = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL);
const LOGIN_ROUTE = "/login";
const PROFESSOR_DASHBOARD_ROUTE = "/professor/dashboard";

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

const redirectToLoginWithError = (res, authError, req) => {
  res.redirect(`${getClientUrl(req)}${LOGIN_ROUTE}?authError=${encodeURIComponent(authError)}`);
};

router.get("/google", (req, res, next) => {
  if (!googleAuthConfigured) {
    redirectToLoginWithError(res, "oauth_not_configured", req);
    return;
  }

  passport.authenticate("google", {
    scope: ["profile", "email"],
    callbackURL: getGoogleCallbackUrl(req)
  })(req, res, next);
});

router.get("/google/callback", (req, res, next) => {
  console.log("CALLBACK HIT");

  passport.authenticate("google", {
    callbackURL: getGoogleCallbackUrl(req)
  }, (error, user, info) => {
    if (error) {
      console.error("Google OAuth callback failed:", error);
      redirectToLoginWithError(res, "oauth_callback_failed", req);
      return;
    }

    if (!user) {
      const authError = info?.message?.includes("@umib.net")
        ? "unauthorized_domain"
        : "google_login_failed";

      redirectToLoginWithError(res, authError, req);
      return;
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        console.error("Creating session after Google login failed:", loginError);
        redirectToLoginWithError(res, "session_login_failed", req);
        return;
      }

      console.log("LOGIN SUCCESS");
      res.redirect(`${getClientUrl(req)}${PROFESSOR_DASHBOARD_ROUTE}`);
    });
  })(req, res, next);
});

export default router;

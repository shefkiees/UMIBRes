import express from "express";
import passport from "../config/passport.js";
import { googleAuthConfigured } from "../config/passport.js";

const router = express.Router();
const LOGIN_ROUTE = "/login";
const PROFESSOR_DASHBOARD_ROUTE = "/professor/dashboard";

const redirectToLoginWithError = (res, authError) => {
  res.redirect(`${LOGIN_ROUTE}?authError=${encodeURIComponent(authError)}`);
};

// Start Google login
router.get("/google", (req, res, next) => {
  if (!googleAuthConfigured) {
    redirectToLoginWithError(res, "oauth_not_configured");
    return;
  }

  passport.authenticate("google", {
    scope: ["profile", "email"]
  })(req, res, next);
});

router.get("/google/callback", (req, res, next) => {
  console.log("CALLBACK HIT");

  passport.authenticate("google", (error, user, info) => {
    if (error) {
      console.error("Google OAuth callback failed:", error);
      redirectToLoginWithError(res, "oauth_callback_failed");
      return;
    }

    if (!user) {
      const authError = info?.message?.includes("@umib.net")
        ? "unauthorized_domain"
        : "google_login_failed";

      redirectToLoginWithError(res, authError);
      return;
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        console.error("Creating session after Google login failed:", loginError);
        redirectToLoginWithError(res, "session_login_failed");
        return;
      }

      console.log("LOGIN SUCCESS");
      res.redirect(PROFESSOR_DASHBOARD_ROUTE);
    });
  })(req, res, next);
});

export default router;

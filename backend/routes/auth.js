import express from "express";
import passport, { googleAuthConfigured } from "../config/passport.js";
import { getAbsoluteUrlEnvValue } from "../config/urlConfig.js";

const router = express.Router();
const DEFAULT_PRODUCTION_ORIGIN = "https://umibres.page";
const DEFAULT_GOOGLE_CALLBACK_PATH = "/api/auth/google/callback";
const frontendBaseUrl = (getAbsoluteUrlEnvValue(process.env.FRONTEND_URL)
  || (process.env.NODE_ENV === "production"
    ? DEFAULT_PRODUCTION_ORIGIN
    : "http://localhost:5173"))
  .replace(/\/$/, "");
const configuredGoogleCallbackUrl = getAbsoluteUrlEnvValue(process.env.GOOGLE_CALLBACK_URL);

const getRequestBaseUrl = (req) => {
  const forwardedProtoHeader = req.get("x-forwarded-proto");
  const forwardedHostHeader = req.get("x-forwarded-host");
  const protocol = forwardedProtoHeader?.split(",")[0].trim() || req.protocol;
  const host = forwardedHostHeader?.split(",")[0].trim() || req.get("host");

  return `${protocol}://${host}`;
};

const getGoogleCallbackUrl = (req) => {
  if (configuredGoogleCallbackUrl) {
    return configuredGoogleCallbackUrl;
  }

  if (process.env.NODE_ENV === "production") {
    return `${DEFAULT_PRODUCTION_ORIGIN}${DEFAULT_GOOGLE_CALLBACK_PATH}`;
  }

  return `${getRequestBaseUrl(req)}${DEFAULT_GOOGLE_CALLBACK_PATH}`;
};

const getFrontendRedirectUrl = (path, params = {}) => {
  const url = new URL(path, `${frontendBaseUrl}/`);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
};

const redirectToLoginWithError = (res, authError) => {
  res.redirect(getFrontendRedirectUrl("/login", { authError }));
};

const ensureGoogleAuthConfigured = (res) => {
  if (googleAuthConfigured) {
    return true;
  }

  console.error(
    "Rejected Google sign-in request because OAuth env vars are missing in this environment."
  );
  redirectToLoginWithError(res, "oauth_not_configured");
  return false;
};

// start login
router.get("/google", (req, res, next) => {
  if (!ensureGoogleAuthConfigured(res)) {
    return;
  }

  const callbackURL = getGoogleCallbackUrl(req);

  console.log("Google OAuth callback URL:", callbackURL);

  passport.authenticate("google", {
    scope: ["profile", "email"],
    callbackURL
  })(req, res, next);
});

// callback
router.get("/google/callback", (req, res, next) => {
  if (!ensureGoogleAuthConfigured(res)) {
    return;
  }

  const callbackURL = getGoogleCallbackUrl(req);

  passport.authenticate("google", {
    callbackURL
  }, (authError, user, info) => {
    if (authError) {
      console.error("Google OAuth callback failed:", authError);
      redirectToLoginWithError(res, "oauth_callback_failed");
      return;
    }

    if (!user) {
      const authErrorCode =
        info?.message === "Only @umib.net email addresses are allowed."
          ? "unauthorized_domain"
          : "google_login_failed";

      redirectToLoginWithError(res, authErrorCode);
      return;
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        console.error("Failed to create login session:", loginError);
        redirectToLoginWithError(res, "session_login_failed");
        return;
      }

      res.redirect(getFrontendRedirectUrl("/dashboard"));
    });
  })(req, res, next);
});

export default router;

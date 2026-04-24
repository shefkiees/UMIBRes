/* eslint-env node */

import "./env.js";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "./db.js";

const DEFAULT_GOOGLE_CALLBACK_PATH = "/api/auth/google/callback";
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackUrl =
  process.env.NODE_ENV === "production" && process.env.GOOGLE_CALLBACK_URL
    ? process.env.GOOGLE_CALLBACK_URL
    : DEFAULT_GOOGLE_CALLBACK_PATH;
const shouldRequireDbUserSync = process.env.REQUIRE_DB_USER_SYNC === "true";
const googleAuthConfigured = Boolean(googleClientId && googleClientSecret);

const persistGoogleUser = (googleUser) => new Promise((resolve, reject) => {
  db.query(
    `INSERT INTO users (google_id, email, full_name)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), email = VALUES(email)`,
    [googleUser.id, googleUser.email, googleUser.displayName],
    (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    }
  );
});

if (googleAuthConfigured) {
  passport.use(new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log("Google profile object:", profile);
      console.log("Google ID:", profile.id);
      console.log("Email:", profile.emails?.[0]?.value);
      console.log("Display Name:", profile.displayName);

      const email = profile.emails?.[0]?.value?.trim().toLowerCase();

      if (!email) {
        return done(null, false, { message: "Google account did not provide an email address." });
      }

      if (!email.endsWith("@umib.net")) {
        return done(null, false, { message: "Only @umib.net email addresses are allowed." });
      }

      const user = {
        id: profile.id,
        email,
        displayName: profile.displayName
      };

      try {
        await persistGoogleUser(user);
      } catch (error) {
        console.error("Failed to sync Google user to MySQL:", error);

        if (shouldRequireDbUserSync) {
          return done(error);
        }
      }

      return done(null, user);
    }
  ));
} else {
  console.error(
    "Google OAuth is not configured. Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET."
  );
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

export { googleAuthConfigured };
export default passport;

/* eslint-env node */

import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "./db.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile object:", profile);
        console.log("Google ID:", profile.id);
        console.log("Email:", profile.emails?.[0]?.value);
        console.log("Display Name:", profile.displayName);

        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(null, false, { message: "Email nuk u kthye nga Google" });
        }

        if (!email.endsWith("@umib.net")) {
          return done(null, false, { message: "Vetëm email @umib.net lejohet" });
        }

        await db.query(
          `INSERT INTO users (google_id, email, full_name)
           VALUES (?, ?, ?)
           ON DUPLICATE KEY UPDATE full_name = VALUES(full_name), email = VALUES(email)`,
          [profile.id, email, profile.displayName]
        );

        const user = {
          id: profile.id,
          email,
          full_name: profile.displayName
        };

        return done(null, user);
      } catch (err) {
        console.error("Passport Google Strategy Error:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
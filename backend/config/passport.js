/* eslint-env node */

import "./env.js";

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import db from "./db.js";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL

  },
  (accessToken, refreshToken, profile, done) => {

    console.log("Google profile object:", profile);
    console.log("Google ID:", profile.id);
    console.log("Email:", profile.emails[0].value);
    console.log("Display Name:", profile.displayName);

    const email = profile.emails[0].value;

    if (!email.endsWith("@umib.net")) {
      return done(null, false, { message: "Vetëm email @umib.net lejohet" });
    }

    db.query(
      "INSERT INTO users (google_id, email, full_name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE full_name=?",
      [profile.id, email, profile.displayName, profile.displayName],
      (err) => {
        if (err) return done(err);
        return done(null, profile);
      }
    );


  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

export default passport;

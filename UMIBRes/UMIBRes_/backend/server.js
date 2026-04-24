import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import doiRoutes from "./routes/doi.js";

const app = express();

// Middleware
const callbackOrigin = process.env.GOOGLE_CALLBACK_URL
  ? new URL(process.env.GOOGLE_CALLBACK_URL).origin
  : null;
const clientUrl = process.env.CLIENT_URL || callbackOrigin;
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  clientUrl
].filter(Boolean));

app.set("trust proxy", 1);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || "umibres-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Route bazë për test
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// Route për autentifikim
app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

// Route për DOI metadata
app.use("/api/doi", doiRoutes);

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;

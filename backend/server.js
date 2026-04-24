import "./config/env.js";

import express from "express";
import session from "express-session";
import { checkDbConnection } from "./config/db.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.set("trust proxy", 1);
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || "umibres-secret",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Backend running...");
});

app.use("/auth", authRoutes);
app.use("/api/auth", authRoutes);

// Vetëm për local development
if (process.env.NODE_ENV !== "production") {
  app.listen(5000, async () => {
    console.log("Server running on http://localhost:5000");
    await checkDbConnection();
  });
}

export default app;

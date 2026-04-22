import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";


const app = express();

app.use(session({
  secret: "umibres-secret",
  resave: false,
  saveUninitialized: true
}));




app.use(passport.initialize());
app.use(passport.session());

// rute bazë për test
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// rute për autentifikim
app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));

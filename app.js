import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";

config({
  path: "./config/config.env",
});
const app = express();

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
import user from "./routes/userRoutes.js";
app.use("/api/v1/user", user);
export default app;

app.get("/", (req, res) =>
  res.send(
    `<h1>Site is Working. click <a href='#'>here</a> to visit frontend.</h1>`
  )
);

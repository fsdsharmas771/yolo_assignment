import express from "express";

import {
  registartion,
  logIn,
  anyAction,
} from "../controllers/userController.js";

import { isAuthenticated } from "../middlewares/auth.js";
import { interceptor } from "../middlewares/intercepter.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// To register a new user
router.route("/register").post(registartion);
router.route("/login").post(logIn);

//this endpoint can be of any request method type like get post put delete etc
router
  .route("/anyTask")
  .put(isAuthenticated, rateLimiter, interceptor, anyAction);

export default router;

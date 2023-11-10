import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import { User } from "../models/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer"))
    return next(new ErrorHandler("please provide the token", 401));

  // Get Token from header
  token = authorization.split(" ")[1];

  if (!token) return next(new ErrorHandler("Not Logged In", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  let user = await User.findById(decoded._id);
  if (user.activeToken == token) req.user = await User.findById(decoded._id);
  else return next(new ErrorHandler("Logged In Again,Token Expired", 401));
  next();
});

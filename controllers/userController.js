import { User } from "../models/User";
import ErrorHandler from "../middlewares/errorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import bcrypt from "bcrypt";

export const registartion = catchAsyncError(async (req, res, next) => {
  let { userName, password } = req.body;

  if (!userName || !password || !confirmPassword)
    return next(
      new ErrorHandler(
        "Please enter all field (userName,password,confirmPassword)",
        400
      )
    );
  let user;
  if (userName) {
    user = await User.findOne({ userName });
    if (user) return next(new ErrorHandler("User Already Exist", 409));
  }
  if (password != confirmPassword)
    return next(
      new ErrorHandler("Password and Confirm Password Mis-Match", 400)
    );
  if (password.length < 6)
    return next(new ErrorHandler("Enter Atleast 6 Digit Password", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    userName,
    password: hashedPassword,
  });

  const token = user.getJWTToken();
  user.activeToken = token;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Registered Successfully !",
    token,
  });
});

export const logIn = catchAsyncError(async (req, res, next) => {
  let { userName, password } = req.body;

  if (!userName || !password)
    return next(
      new ErrorHandler("Please enter all field (userName,password)", 400)
    );
  const user = await User.findOne({ userName });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = user.getJWTToken();
    user.activeToken = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } else {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
});

export const anyAction = catchAsyncError(async (req, res, next) => {
  //we can perform any operation here like update delete or any other
  return res.status(200).json({
    success: true,
    message: "Hit CURD Operation API",
  });
});

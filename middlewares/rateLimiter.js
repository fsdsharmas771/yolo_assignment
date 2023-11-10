import rateLimit from "express-rate-limit";

//using express rate limit to limit the api calls per minute which for now I set 10/min from the same IP
export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import config from "../config/config.js";

function isJWTPayload(value: JwtPayload | String): value is JwtPayload {
  return (value as JwtPayload) !== undefined;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeaders = req.header("Authorization");
    const token = authHeaders?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Authorization Token is Required", [
        "Invalid Token",
        "Token not found",
      ]);
    }

    const decodedToken = jwt.verify(token, config.JWT_SECRET);

    const isJwtPayload = isJWTPayload(decodedToken);

    if (isJwtPayload) {
      const { userId, email, isRegistered } = decodedToken;
      req.userData = { userId, email, isRegistered };

      next();
    } else {
      throw new ApiError(401, "Invalid Token", [
        "Invalid token",
        "Unauthorized access",
      ]);
    }
  } catch (error) {
    console.log("Failed to process token", error);

    next(error);
  }
};

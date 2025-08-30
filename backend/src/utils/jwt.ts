import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/config.js";

export function generateJwt(payload: JwtPayload): string {
  return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "7d" });
}

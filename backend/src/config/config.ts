import "dotenv/config";
import type { ConfigData } from "../types/index.js";

const config: ConfigData = {
  PORT: Number(process.env.PORT_NUMBER) || 5000,
  NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL!,
  NODE_MAILER_EMAIL_PASSWORD: process.env.NODE_MAILER_EMAIL_PASSWORD!,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL!,
  FRONTEND_URL:process.env.FRONTEND_URL!
};

export default config;

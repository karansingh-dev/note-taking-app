import "dotenv/config";
import type { ConfigData } from "../types/index.js";

const config: ConfigData = {
  PORT: Number(process.env.PORT_NUMBER) || 5000,
  NODE_MAILER_EMAIL: process.env.NODE_MAILER_EMAIL!,
  NODE_MAILER_EMAIL_PASSWORD: process.env.NODE_MAILER_EMAIL_PASSWORD!,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
};

export default config;

import "dotenv/config";
import type { ConfigData } from "../types/index.js";

const config: ConfigData = {
  PORT: Number(process.env.PORT_NUMBER) || 5000,
};

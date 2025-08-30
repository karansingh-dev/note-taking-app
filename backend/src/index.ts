import express, { type Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/config.js";
import "./routes/allRoutes.js";
import { router } from "./routes/router.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import { router as googleAuth } from "./controller/googleAuth.controller.js";

const app: Application = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(bodyParser.json());

app.use("/api", router);
//for google sign in option
app.use(googleAuth);

app.use(globalErrorHandler);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});

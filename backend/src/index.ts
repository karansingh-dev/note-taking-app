import express, { type Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./config/config.js";
import "./routes/allRoutes.js";
import { router } from "./routes/router.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

app.use(globalErrorHandler);

app.listen(config.PORT, () => {
  console.log(`Server started on port ${config.PORT}`);
});

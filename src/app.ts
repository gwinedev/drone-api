import express from "express";
import { errorHandler, invalidRouteHandler } from "./middleware/error-handler";
import droneRouter from "./route/drone.routes";
import appConfig from "./config";

const app = express();

app.use(express.json());

app.use("/api/drones", droneRouter);

app.use(invalidRouteHandler);
app.use(errorHandler);

export default app;

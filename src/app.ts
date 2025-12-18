import express from "express";
import { errorHandler, invalidRouteHandler } from "./middleware/error-handler";
import { BadRequest } from "./utils/custom-errors";
import { authGuard } from "./middleware/auth";

import appConfig from "./config";

const app = express();

app.use(express.json());

app.get("/test-errors", (req, res) => {
  try {
    res.send("Testing");
    console.log("I am catching an error");
    throw new BadRequest("This drone is too heavy");
  } catch (error: any) {
    console.log("Caught the error!");
    console.log("Message: ", error.message);
  }
});

app.get("/secret-mission", authGuard, (req, res) => {
  res.json({ message: "Welcome, Pilot. The secret code is 12345." });
});

app.use(invalidRouteHandler);
app.use(errorHandler);

export default app;

import express from "express";
import { errorHandler, invalidRouteHandler } from "./middleware/error-handler";
import { BadRequest } from "./utils/custom-errors";
import { authGuard } from "./middleware/auth";

import appConfig from "./config";
import { DroneModelSchema, DroneStateSchema } from "./schemas/shared";
import { RegisterDroneInput, RegisterDroneSchema } from "./schemas/drones";

const app = express();

app.use(express.json());

app.get("/test-errors", (req, res) => {
  const goodDrone: RegisterDroneInput = {
    serialNumber: "DRONE-001",
    model: "LIGHTWEIGHT",
    weightLimit: 900,
    batteryCapacity: 85,
  };

  const result = RegisterDroneSchema.safeParse(goodDrone);
if (!result.success) {
  console.log("❌ Caught errors:");
  // This loop shows us exactly what went wrong
  result.error.issues.forEach(issue => {
    console.log(`- [${issue.path}]: ${issue.message}`);
  });
  res.send("Testing");
}
});

app.get("/secret-mission", authGuard, (req, res) => {
  res.json({ message: "Welcome, Pilot. The secret code is 12345." });
});

app.use(invalidRouteHandler);
app.use(errorHandler);

export default app;

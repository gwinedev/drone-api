import { Router } from "express";
import { DroneController } from "../controllers/drone.controller";
import { authGuard } from "../middleware/auth";

const droneRouter = Router();

droneRouter.post("/register", authGuard, DroneController.register);

export default droneRouter;

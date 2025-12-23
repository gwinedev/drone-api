import { Request, Response, NextFunction } from "express";
import { RegisterDroneSchema } from "../schemas/drones";
import { BadRequest } from "../utils/custom-errors";
import { DroneService } from "../services/drones/drone.service";
import { LoadMedicationSchema } from "../schemas/medications";

export const DroneController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = RegisterDroneSchema.safeParse(req.body);

      if (!validation.success) {
        // take the first error Zod finds
        throw new BadRequest(validation.error.issues[0].message);
      }
      const newDrone = await DroneService.registerDrone(validation.data);
      return res.status(201).json({
        message: "Drone registered successfully!",
        data: newDrone,
      });
    } catch (error) {
      // if anything goes wrong, send it to Error Handler
      next(error);
    }
  },

  loadMedication: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const validation = LoadMedicationSchema.safeParse(req.body);
      if (!validation.success) {
        throw new BadRequest(validation.error.issues[0].message);
      }
      const result = await DroneService.loadMedication(id, validation.data);

      return res.status(201).json({
        message: "Medication loaded successfully!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  },
};

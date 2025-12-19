import { Request, Response, NextFunction } from "express";
import { RegisterDroneSchema } from "../schemas/drones";
import { DroneRepository } from "../repositories/drone.repository";
import { BadRequest } from "../utils/custom-errors";

export const DroneController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validation = RegisterDroneSchema.safeParse(req.body);

      if (!validation.success) {
        // take the first error Zod finds
        const firstError = validation.error.issues[0].message;
        throw new BadRequest(firstError);
      }
      const existingDrone = await DroneRepository.findBySerialNumber(
        validation.data.serialNumber
      );
      if (existingDrone) {
        throw new BadRequest(
          "A drone with the same serial number is already in the fleet!"
        );
      }
      // tell the librarian to save it
      const newDrone = await DroneRepository.register(validation.data);
      return res.status(201).json({
        message: "Drone registered successfully!",
        data: newDrone,
      });
    } catch (error) {
      // if anything goes wrong, send it to Error Handler
      next(error);
    }
  },
};

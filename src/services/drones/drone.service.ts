import { DroneRepository } from "../../repositories/drone.repository";
import { RegisterDroneInput } from "../../schemas/drones";
import { BadRequest } from "../../utils/custom-errors";

export const DroneService = {
  registerDrone: async (data: RegisterDroneInput) => {
    // check if the serial number is already taken
    const existing = await DroneRepository.findBySerialNumber(
      data.serialNumber
    );
    if (existing) {
      throw new BadRequest("This drone is already registered in our system.");
    }
    // check battery level - don't register a dead drone
    if(data.batteryCapacity < 10){
        throw new BadRequest("Cannot register a drone with less than 10% battery")
    }
  },
};

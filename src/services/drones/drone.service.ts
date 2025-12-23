import { DroneRepository } from "../../repositories/drone.repository";
import { RegisterDroneInput } from "../../schemas/drones";
import { BadRequest, NotFound } from "../../utils/custom-errors";

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
    if (data.batteryCapacity < 10) {
      throw new BadRequest(
        "Cannot register a drone with less than 10% battery"
      );
    }
  },

  loadMedication: async (droneId: string, medData: any) => {
    const drone = await DroneRepository.findById(droneId);
    if (!drone) throw new NotFound("Drone not found");

    if (drone.batteryCapacity < 25) {
      throw new BadRequest("Battery toolow to start loading (below 25%)");
    }
    const currentWeight = drone.medications.reduce(
      (sum, m) => sum + m.weight,
      0
    );
    if (currentWeight + medData.weight > drone.weightLimit) {
      throw new BadRequest("Drone cannot carry this much weight!");
    }
    await DroneRepository.updateStatus(droneId, "LODAING");
    const medication = await DroneRepository.addMedicationToDrone(
      droneId,
      medData
    );
    return medication;
  },
};

import { PrismaClient } from "@prisma/client";
import { RegisterDroneInput } from "../schemas/drones";

// create an instance of our Prisma Secretary
const prisma = new PrismaClient();

export const DroneRepository = {
  async register(data: RegisterDroneInput) {
    return await prisma.drone.create({
      data: {
        serialNumber: data.serialNumber,
        model: data.model,
        weightLimit: data.weightLimit,
        batteryCapacity: data.batteryCapacity,
        // No need for state since it starts as idle
      },
    });
  },

  async findBySerialNumber(serialNumber: string) {
    return await prisma.drone.findUnique({
      where: { serialNumber },
    });
  },
};

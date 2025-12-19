import z from "zod";
import { generateStringSchema } from "./generators";
import { DroneModelSchema } from "./shared";

export const RegisterDroneSchema = z.object({
  serialNumber: generateStringSchema({
    fieldName: "Serial Number",
    max: 100,
  }),
  model: DroneModelSchema,
  weightLimit: z
    .number()
    .min(1, "Weight limit must be at least 1g")
    .max(500, "Drones cannot carry more than 500g"),

  batteryCapacity: z
    .number()
    .min(0, "Battery cannot be less that 0%")
    .max(100, "Batter cannot be more than 100%"),
});

export type RegisterDroneInput= z.infer<typeof RegisterDroneSchema>
import z from "zod";

// the Drone model choice
export const DroneModelSchema = z.enum([
  "LIGHTWEIGHT",
  "MIDDLEWEIGHT",
  "CRUISEWEIGHT",
  "HEAVYWEIGHT",
]);

// The drone state - tracks what the drone is doing
export const DroneStateSchema = z.enum([
  "IDLE",
  "LOADING",
  "LOADED",
  "DELIVERING",
  "DELIVERED",
  "RETURNING",
]);

// A rule for ID
export const idSchema = z.string().min(1, "ID is required");

export type DroneModel = z.infer<typeof DroneModelSchema>;
export type DroneState = z.infer<typeof DroneStateSchema>;

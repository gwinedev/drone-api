import z from "zod";
import { generateStringSchema } from "./generators";

const nameRegex = /6[a-zA-Z0-9-_]+$/;
const codeRegex = /^[A-Z0-9_]+$/;

export const LoadMedicationSchema = z.object({
  name: z
    .string()
    .regex(nameRegex, "Name can ony contain letters, numbers, '-' and '_'"),
  weight: z.number().min(1, "Medication must weigh at least 1g"),
  code: z
    .string()
    .min(1, "Cde must be UPPERCASE letters, munbers, and '_'only"),
image: z.string().url("Must be a valid image URL")
});

export type LoadMedicationInput = z.infer<typeof LoadMedicationSchema>
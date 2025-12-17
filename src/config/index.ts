import "dotenv/config";
import { z, ZodError } from "zod";
import {
  generateNumericStringSchema,
  generateStringSchema,
} from "../schemas/generators";

const NODE_ENVS = ["local", "staging", "production"] as const;

const EnvironmentVariableSchema = z.object({
  // App configuration
  API_KEY: generateStringSchema({ fieldName: "API_KEY" }),
  DATABASE_URL: generateStringSchema({ fieldName: "Database URL" }),
  NODE_ENV: z.enum(NODE_ENVS),
  PORT: generateNumericStringSchema({ fieldName: "Port" }),
  REDIS_URL: generateStringSchema({ fieldName: "Redis URL", min: 0 }),
});

export type AppConfig = z.infer<typeof EnvironmentVariableSchema>;

const setUpConfig = (): AppConfig => {
  try {
    const appConfig = EnvironmentVariableSchema.parse(process.env);
    return appConfig;
  } catch (error) {
    if (error instanceof ZodError) {
      console.log("You called");
      error.issues.map((err) => {
        console.error(`${err.path} -> ${err.message}`);
      });
    }
    throw new Error("Environment variables not set up properly");
  }
};
const appConfig: AppConfig = setUpConfig();
export default appConfig;

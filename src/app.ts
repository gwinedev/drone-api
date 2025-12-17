import express from "express";
import { errorHandler, invalidRouteHandler } from "./middleware/error-handler";
import appConfig from "./config";

const app = express();

app.use(express.json());

app.use(invalidRouteHandler);
app.use(errorHandler);

app.get("/test-errors", (req, res) => {
  throw new Error("Ooops! This is a mystery error");
});

export const startServer = () => {
  app.listen(appConfig.PORT, () => {
    console.log(`Server running on port ${appConfig.PORT}`);
  });
};

export default app;

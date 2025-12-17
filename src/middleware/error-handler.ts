import { ErrorRequestHandler, RequestHandler } from "express";
import { CustomHttpError } from "../utils/custom-errors";

export const invalidRouteHandler: RequestHandler = (req, res) => {
  res.status(404).json({ message: "Route does not exist" });
};

// Catches all errors in the app
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log("Error caught:", error.message);

  if (error instanceof CustomHttpError) {
    return res.status(error.statusCode).json({ message: error.message });
  }
  //   If it is a mystery error, send a "500"
  res.status(500).json({ message: "Something went wrong, try again later" });
};

import { RequestHandler } from "express";
import appConfig from "../config";
import { Forbidden } from "../utils/custom-errors";

export const authGuard: RequestHandler = (req, res, next) =>{
    const userKey = req.headers["x-api-key"];

    // check if the key they sent matches our secret key from .env
    if(userKey === appConfig.API_KEY){
        return next()
    }
    throw new Forbidden("Invalid or missing API Key. You are not allowed to in")
}
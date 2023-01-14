import { CreateCarController } from "@modules/car/use-cases/create-cars/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post("/",
ensureAuthentication, 
ensureAdmin, 
createCarController.handle );

export {carsRoutes}
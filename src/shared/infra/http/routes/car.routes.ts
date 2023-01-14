import { CreateCarController } from "@modules/car/use-cases/create-cars/CreateCarController";
import { Router } from "express";

const carsRoutes = Router();
const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle );

export {carsRoutes}
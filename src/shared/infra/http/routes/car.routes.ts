import { CreateCarController } from "@modules/car/use-cases/create-cars/CreateCarController";
import { ListCarsController } from "@modules/car/use-cases/list-cars/ListCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post("/",
ensureAuthentication, 
ensureAdmin, 
createCarController.handle );

carsRoutes.get("/", 
ensureAuthentication, 
ensureAdmin, listCarsController.handle);

export {carsRoutes}
import { CreateCarController } from "@modules/car/use-cases/create-cars/CreateCarController";
import { ListAvaliableCarsController } from "@modules/car/use-cases/list-avaliable-cars/ListAvaliableCarsController";
import { ListCarsController } from "@modules/car/use-cases/list-cars/ListCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const listAvaliableCarsController = new ListAvaliableCarsController();

carsRoutes.post("/",
ensureAuthentication, 
ensureAdmin, 
createCarController.handle );

carsRoutes.get("/all", 
ensureAuthentication, 
ensureAdmin, listCarsController.handle);

carsRoutes.get("/avaliable", listAvaliableCarsController.handle);
export {carsRoutes}
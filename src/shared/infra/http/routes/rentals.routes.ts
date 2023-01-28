import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/use-cases/create-rental/CreateRentalController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { DevolutionRentalController } from "@modules/rentals/use-cases/devolution-rental/DevolutionRentalController";
const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
rentalsRoutes.post("/",
 ensureAuthentication, 
 createRentalController.handle);

 rentalsRoutes.post("/devolution/:id",
 ensureAuthentication, 
 devolutionRentalController.handle);


export {rentalsRoutes}
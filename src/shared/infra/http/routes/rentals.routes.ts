import { Router } from "express";
import { CreateRentalController } from "@modules/rentals/use-cases/create-rental/CreateRentalController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { DevolutionRentalController } from "@modules/rentals/use-cases/devolution-rental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/use-cases/list-rentals-by-user/ListRentalsByUserController";
const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();
rentalsRoutes.post("/",
 ensureAuthentication, 
 createRentalController.handle);

 rentalsRoutes.post("/devolution/:id",
 ensureAuthentication, 
 devolutionRentalController.handle);

 rentalsRoutes.get("/user", ensureAuthentication,listRentalsByUserController.handle);


export {rentalsRoutes}
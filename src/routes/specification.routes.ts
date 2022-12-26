import Router from "express";
import { CreateSpecificationsController } from "../modules/car/use-cases/create-specification/CreateSpecificationsController";
import { ListSpecificationsController } from "../modules/car/use-cases/list-specifications/ListSpecificationsController";
export const specificationRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();  
specificationRoutes.get("/", listSpecificationsController.handle);
const createSpecificationsController = new CreateSpecificationsController();
specificationRoutes.post("/",createSpecificationsController.handle);

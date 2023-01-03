import Router from "express";
import { CreateSpecificationsController } from "@modules/car/use-cases/create-specification/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/car/use-cases/list-specifications/ListSpecificationsController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
export const specificationRoutes = Router();
specificationRoutes.use(ensureAuthentication);
const listSpecificationsController = new ListSpecificationsController();  

specificationRoutes.get("/", listSpecificationsController.handle);
const createSpecificationsController = new CreateSpecificationsController();
specificationRoutes.post("/",ensureAuthentication, createSpecificationsController.handle);

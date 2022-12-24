import Router from "express";
import { createSpecificationsController } from "../modules/car/use-cases/create-specification";
import { listSpecificationsController } from "../modules/car/use-cases/list-specifications";
export const specificationRoutes = Router();


specificationRoutes.get("/", (request, response) => {
    
return listSpecificationsController.handle(request, response);
});

specificationRoutes.post("/", (request, response) => {
    return createSpecificationsController.handle(request, response);
});

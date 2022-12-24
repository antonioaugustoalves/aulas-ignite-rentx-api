import Router from "express";
import { Specification } from "../modules/car/models/Specification";
import { SpecificationsRepository } from "../modules/car/repositories/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/car/services/CreateSpecificationService";

export const specificationRoutes = Router();
const specificationsRepository = new SpecificationsRepository();

specificationRoutes.get("/", (request, response) => {
    const specifications = specificationsRepository.list();
    return response.status(200).json(specifications);
});

specificationRoutes.post("/", (request, response) => {
    const {name, description} = request.body;
    const createSpecificatioService = new CreateSpecificationService(specificationsRepository);
    createSpecificatioService.execute({name, description});
    return response.status(201).send("Created");
});

import Router from "express";
import { Category } from "../modules/car/models/Category";
import { CategoriesRepository } from "../modules/car/repositories/CategoriesRepository";
import { CreateCategoryService } from "../modules/car/services/CreateCategoryService";
export const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();
categoriesRoutes.get("/", (request, response) => {

    const categories = categoriesRepository.list();
    response.status(200).json(categories);
});

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;
    const createCategoryService = new CreateCategoryService(categoriesRepository);
    createCategoryService.execute({name, description});
    return response.status(201).json({ message: "Created!" })

});
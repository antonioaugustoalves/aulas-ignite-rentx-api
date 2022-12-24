import Router from "express";
import { Category } from "../modules/car/models/Category";
import { createCategoryController } from "../modules/car/use-cases/create-category";
import { listCategoriesController } from "../modules/car/use-cases/list-categories/";
export const categoriesRoutes = Router();


categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});
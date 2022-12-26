import Router from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/car/use-cases/create-category/CreateCategoryController";
import { importCategoriesControler } from "../modules/car/use-cases/import-categories";
import { ListCategoriesController } from "../modules/car/use-cases/list-categories/ListCategoriesController";
export const categoriesRoutes = Router();

const upload = multer(
  {
    dest: "./tmp"
  }  
);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.post("/import",upload.single("file"), (request, response) => {
    importCategoriesControler.handle(request, response);
})
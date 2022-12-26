import Router from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/car/use-cases/create-category/CreateCategoryController";
import { listCategoriesController } from "../modules/car/use-cases/list-categories/";
import { importCategoriesControler } from "../modules/car/use-cases/import-categories";
export const categoriesRoutes = Router();

const upload = multer(
  {
    dest: "./tmp"
  }  
);


categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController.handle(request, response);
});
const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.post("/import",upload.single("file"), (request, response) => {
    importCategoriesControler.handle(request, response);
})
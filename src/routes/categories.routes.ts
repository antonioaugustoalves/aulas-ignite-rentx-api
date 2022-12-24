import Router from "express";
import multer from "multer";
import { Category } from "../modules/car/models/Category";
import { createCategoryController } from "../modules/car/use-cases/create-category";
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

categoriesRoutes.post("/", (request, response) => {
    return createCategoryController.handle(request, response);
});

categoriesRoutes.post("/import",upload.single("file"), (request, response) => {
    importCategoriesControler.handle(request, response);
})
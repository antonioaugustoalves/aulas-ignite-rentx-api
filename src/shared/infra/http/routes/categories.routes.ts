import Router from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/car/use-cases/create-category/CreateCategoryController";
import { ImportCategoriesControler } from "@modules/car/use-cases/import-categories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/car/use-cases/list-categories/ListCategoriesController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureAdmin } from "../middlewares/ensureAdmin";
export const categoriesRoutes = Router();

const upload = multer(
  {
    dest: "./tmp"
  }  
);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/",ensureAuthentication, ensureAdmin, listCategoriesController.handle);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/",ensureAuthentication, ensureAdmin, createCategoryController.handle);

const importCategoriesController = new ImportCategoriesControler();
categoriesRoutes.post("/import",ensureAuthentication, ensureAdmin, upload.single("file"), importCategoriesController.handle)
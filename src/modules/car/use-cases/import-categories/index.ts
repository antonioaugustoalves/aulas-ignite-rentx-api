import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoriesControler } from "./ImportCategoriesController";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoriesUseCase = new ImportCategoriesUseCase(categoriesRepository);
const importCategoriesControler = new ImportCategoriesControler(importCategoriesUseCase);

export {importCategoriesControler};
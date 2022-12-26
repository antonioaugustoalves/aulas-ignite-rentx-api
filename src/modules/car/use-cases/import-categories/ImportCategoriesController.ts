import { Request, Response } from "express";
import {container} from "tsyringe";
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesControler {
    
    handle(request: Request, response: Response): Response {
        const { file } = request;
        const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase);
        return response.status(201).send();
    }
}
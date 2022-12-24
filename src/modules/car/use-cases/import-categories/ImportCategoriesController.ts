import { Request, Response } from "express"
import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

export class ImportCategoriesControler {
    constructor(
        private importCategoriesUseCase: ImportCategoriesUseCase
    ) {}
    handle(request: Request, response: Response): Response {
        const { file } = request;
        this.importCategoriesUseCase.execute(file);
        return response.status(201).send();
    }
}
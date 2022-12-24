import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
export class CreateCategoryController {

    constructor(
        private createCategoryUseCase: CreateCategoryUseCase
    ){}

    handle(request: Request, response: Response): void {
        const { name, description } = request.body;
        
        this.createCategoryUseCase.execute({ name, description });
        response.status(201).send("Created!");
    }
}
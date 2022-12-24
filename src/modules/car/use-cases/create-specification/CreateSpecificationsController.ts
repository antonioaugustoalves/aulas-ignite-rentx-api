import { Request, Response } from "express";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";
export class CreateSpecificationsController {
    constructor(private createSpecificationsUseCase: CreateSpecificationsUseCase){}
    handle(request: Request, response: Response):void {
        const { name, description } = request.body;

        this.createSpecificationsUseCase.execute( { name, description });
        response.status(201).send("Specification created");

    }
}
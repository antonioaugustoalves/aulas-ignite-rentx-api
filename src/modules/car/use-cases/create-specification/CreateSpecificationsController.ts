import { Request, Response } from "express";
import {container} from "tsyringe";
import { CreateSpecificationsUseCase } from "./CreateSpecificationsUseCase";
export class CreateSpecificationsController {
    async handle(request: Request, response: Response):Promise<Response> {
        const createSpecificationsUseCase = container.resolve(CreateSpecificationsUseCase);
        const { name, description } = request.body;

        await createSpecificationsUseCase.execute( { name, description });
        return response.status(201).send("Specification created");

    }
}
import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request:Request, response:Response): Promise<Response> {
        const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
        const {id:userId} = request.user;
        const {id} = request.params;

        const rental = await devolutionRentalUseCase
        .execute({id, userId});

        return response.status(200).json(rental);

    }
}

export {DevolutionRentalController}
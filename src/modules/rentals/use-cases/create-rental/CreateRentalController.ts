import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const createRentalUseCase = container.resolve(CreateRentalUseCase);
        const {carId, expectedReturnDate} = request.body;
        const {id} = request.user;

        const rental = createRentalUseCase.execute({
            userId: id, carId, expectedReturnDate
        });

        return response.status(201).json(rental);
    }
}

export {CreateRentalController}
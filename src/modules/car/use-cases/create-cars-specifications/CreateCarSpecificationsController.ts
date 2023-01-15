import {Request, Response} from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationsUseCase } from "./CreateCarSpecifications";
class CreateCarSpecificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const {specificationsId} = request.body;
        const createCarSpecificationsUseCase = container.resolve(CreateCarSpecificationsUseCase);

        const cars = await createCarSpecificationsUseCase.execute(
            {
                carId: id, 
                specificationsId
            });

        return response.json(cars);
    }
}

export {CreateCarSpecificationsController}
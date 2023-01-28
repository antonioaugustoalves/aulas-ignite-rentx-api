import {Request, Response} from "express"
import { container } from "tsyringe"
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";
class ListRentalsByUserController {
    async handle(request: Request, response: Response): Promise<Response>{
        const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);
        const {id} = request.user;
        const rentalByUser = await listRentalsByUserUseCase.execute(id);
        return response.json(rentalByUser);
    }

    }


export {ListRentalsByUserController}
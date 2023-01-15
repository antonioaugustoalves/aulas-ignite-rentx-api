import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase";
class ListAvaliableCarsController {
    async handle(request:Request, response:Response): Promise<Response>{
        const {categoryId, name, brand} = request.query;
        const listAvaliableCarsUseCase = container.resolve(ListAvaliableCarsUseCase);
        const cars = await listAvaliableCarsUseCase.execute({
            categoryId: categoryId as string,
             name: name as string, 
             brand: brand as string
        });

        return response.json(cars);
    }
}

export {ListAvaliableCarsController}
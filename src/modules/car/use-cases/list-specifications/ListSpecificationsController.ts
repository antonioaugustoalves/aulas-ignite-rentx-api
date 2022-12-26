import {Request, Response} from "express";
import {container} from "tsyringe";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase"; 

export class ListSpecificationsController {
    
   async handle(request: Request, response: Response):Promise< Response>{
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);
    const listAll = await listSpecificationsUseCase.execute();
    return response.status(200).json(listAll);
   }
}



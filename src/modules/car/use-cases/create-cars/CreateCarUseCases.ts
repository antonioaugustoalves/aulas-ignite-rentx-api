import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";
interface IRequest {
    name: string;
    description: string;
    dailyRate: number;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    categoryId: string;
    
}
//@injectable()
class CreateCarUseCase {
   constructor(
    //@injectable()
    private carsRepository: ICarsRepository){}

    async 
}

export {CreateCarUseCase}
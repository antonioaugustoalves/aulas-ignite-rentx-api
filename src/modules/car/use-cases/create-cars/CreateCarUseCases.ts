import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
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

    async execute({name, 
    description, dailyRate, 
    licensePlate, fineAmount, brand,
    categoryId}: IRequest): Promise<void> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate);
        if(carAlreadyExists){
            throw new AppError("Car already exists");
        }

        await this.carsRepository.create({
            name, description, dailyRate, 
            licensePlate, fineAmount, brand,
            categoryId
        });

    }
}

export {CreateCarUseCase}
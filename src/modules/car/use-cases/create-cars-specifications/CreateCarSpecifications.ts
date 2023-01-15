import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    carId: string;
    specificationsId: string[];
}

// @injectable()
class CreateCarSpecificationsUseCase {
    constructor(
        // @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}
    async execute({carId, specificationsId}: IRequest): Promise<void> {
        const carExists = await this.carsRepository.findById(carId);
        if(!carExists){
            throw new AppError("Car not found!");
        }
    }
}

export {CreateCarSpecificationsUseCase}
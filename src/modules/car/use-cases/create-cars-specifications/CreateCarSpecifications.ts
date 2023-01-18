import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/car/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    carId: string;
    specificationsId: string[];
}

@injectable()
class CreateCarSpecificationsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ){}
    async execute({carId, specificationsId}: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(carId);
        if(!carExists){
            throw new AppError("Car not found!");
        }

        const specfications = await this
        .specificationsRepository.findByIds(specificationsId);

        carExists.specifications = specfications;

        await this.carsRepository.create(carExists);
        // console.log(carExists);
        return carExists;

    }
}

export {CreateCarSpecificationsUseCase}
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute(): Promise<Car[]> {
        const cars = await this.carsRepository.findAll();
        return cars;
    }
}

export {ListCarsUseCase}
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    categoryId?: string;
    name?: string;
    brand?: string;
}
@injectable()
class ListAvaliableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({categoryId, name, brand}:IRequest): Promise<Car[]>{
        const cars = await this.carsRepository.findAvaliable(
            categoryId, name, brand
        );
        return cars;
    }
}

export {ListAvaliableCarsUseCase}
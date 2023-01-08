import { ICarDTO } from "@modules/car/dtos/ICarDTO";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars:Car[] = [];
    async create({
        name, description, dailyRate, licensePlate,
        fineAmount,brand, categoryId
    }: ICarDTO): Promise<void> {
        const car = new Car();
        Object.assign(car, {
            name, description, dailyRate, licensePlate,
        fineAmount,brand, categoryId
        });
        this.cars.push(car);
    }
    
}
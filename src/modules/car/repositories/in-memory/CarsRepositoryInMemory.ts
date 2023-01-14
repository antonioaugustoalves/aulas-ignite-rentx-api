import { ICarDTO } from "@modules/car/dtos/ICarDTO";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    
    
    cars:Car[] = [];

    async create({
        name, description, dailyRate, licensePlate,
        fineAmount,brand, categoryId
    }: ICarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name, description, dailyRate, licensePlate,
        fineAmount,brand, categoryId
        });
        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        return this.cars.find(car => car.licensePlate === licensePlate);
    }

    async findAll(): Promise<Car[]> {
        return this.cars;
    }

    async findAvaliable(): Promise<Car[]> {
        throw new Error("Method not implemented.");
    }
    
}

export {CarsRepositoryInMemory}
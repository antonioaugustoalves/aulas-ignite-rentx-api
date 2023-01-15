import { ICarDTO } from "@modules/car/dtos/ICarDTO";
import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    
    
    
    cars:Car[] = [];

    async create({
        name, description, dailyRate, licensePlate,
        fineAmount,brand, categoryId, specifications, id
    }: ICarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, {
            name, description, dailyRate, licensePlate,
            fineAmount,brand, categoryId, specifications, id
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

    async findAvaliable(categoryId?:string, 
        name?:string,
        brand?:string): Promise<Car[]> {
        const cars = this.cars
        .filter((car) => {
            if (car.avaliable === true || 
                ((brand && car.brand === brand) ||
                (name && car.name === name) ||
                (categoryId && car.categoryId === categoryId)
                )){
                    return car;
            }
            return null;
        });
        return cars;

    }

    async findById(id: string): Promise<Car> {
       return this.cars.find(car => car.id === id);
    }
    
}

export {CarsRepositoryInMemory}
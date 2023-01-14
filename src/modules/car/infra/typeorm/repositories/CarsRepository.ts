import { ICarDTO } from "@modules/car/dtos/ICarDTO";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;
    constructor(){
        this.repository = getRepository(Car);
    }
    async create({name, description, 
        dailyRate, licensePlate, fineAmount,
        brand, categoryId}: ICarDTO): Promise<Car> {
        
            const car = this.repository.create({
                name, description, dailyRate,
                licensePlate, fineAmount, brand, categoryId
            });

            await this.repository.save(car);
            return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        const car = await this.repository.findOne({
            licensePlate
        });

        return car;
    }
    
}

export {CarsRepository}
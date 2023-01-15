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

    async findAll(): Promise<Car[]> {
        const cars = await this.repository.find();
        return cars;
    }
    
    async findAvaliable(
        categoryId?:string,
        name?: string,
        brand?: string): Promise<Car[]> {
        const carsQuery = await this.repository
        .createQueryBuilder("c")
        .where("c.avaliable = :avaliable",{avaliable: true});

        if(brand){
            carsQuery.andWhere("c.brand = :brand",{brand})
        }

        if(name){
            carsQuery.andWhere("c.name = :name",{name})
        }

        if(categoryId){
            carsQuery.andWhere("c.categoryId = :categoryId",{categoryId})
        }

        const cars = await carsQuery.getMany();
        return cars;
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne({
            id
        });

        return car;
    }
    
}

export {CarsRepository}
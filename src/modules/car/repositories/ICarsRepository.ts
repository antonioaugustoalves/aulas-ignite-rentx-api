import { ICarDTO } from "../dtos/ICarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICarDTO): Promise<Car>;
    findByLicensePlate(licensePlate: string): Promise<Car>;
    findById(id: string): Promise<Car>;
    findAll(): Promise<Car[]>;
    findAvaliable(
        categoryId?:string, 
        name?:string,
        brand?:string):Promise<Car[]>;
    updateAvaliable(id:string, avaliable:boolean):Promise<void>;
}

export {ICarsRepository}
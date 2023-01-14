import { ICarDTO } from "../dtos/ICarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICarDTO): Promise<Car>;
    findByLicensePlate(licensePlate: string): Promise<Car>;
    findAll(): Promise<Car[]>;
    findAvaliable():Promise<Car[]>;
}

export {ICarsRepository}
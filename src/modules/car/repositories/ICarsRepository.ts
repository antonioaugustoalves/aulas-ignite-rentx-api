import { ICarDTO } from "../dtos/ICarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create(data: ICarDTO): Promise<void>;
    findByLicensePlate(licensePlate: string): Promise<Car>;
}

export {ICarsRepository}
import { ICarDTO } from "@modules/car/dtos/ICarDTO";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";

class CarsRepository implements ICarsRepository {
    create(data: ICarDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}

export {CarsRepository}
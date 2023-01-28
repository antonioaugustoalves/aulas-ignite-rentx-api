import { IRentalDTO } from "../dto/IRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    create(data: IRentalDTO): Promise<Rental>;
    findOpenRentalByCar(carId: string): Promise<Rental>; 
    findOpenRentalByUser(userId: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    findByUserId(userId:string): Promise<Rental[]>;

}

export {IRentalsRepository}
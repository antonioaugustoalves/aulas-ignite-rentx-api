import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[] = [];
    async create(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findOpenRentalByCar(carId: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.carId === carId && rental.endDate === null);
    
    }
    
    async findOpenRentalByUser(userId: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.userId === userId && rental.endDate === null);
    }

}

export {RentalsRepositoryInMemory}
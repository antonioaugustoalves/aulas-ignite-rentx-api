import { IRentalDTO } from "@modules/rentals/dto/IRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";


class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[] = [];
    async create({
        userId, 
        carId, 
        expectedReturnDate}: IRentalDTO): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, {
            userId, carId, expectedReturnDate,
            startDate: new Date()
        })

        this.rentals.push(rental);
        return rental;
    }
    async findOpenRentalByCar(carId: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.carId === carId && !rental.endDate);
    
    }

    async findOpenRentalByUser(userId: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.userId === userId && !rental.endDate);
    }

}

export {RentalsRepositoryInMemory}
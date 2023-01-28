import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository
    ){}
    async execute(userId: string): Promise<Rental[]> {
        const rentalsByUser = 
        await this.rentalsRepository.findByUserId(userId);

        return rentalsByUser;
    }
}

export {ListRentalsByUserUseCase}
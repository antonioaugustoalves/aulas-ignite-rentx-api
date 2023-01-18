import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    userId: string;
    carId: string;
    expectedReturnDate: Date;

}
class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
    ){}
    async execute({
        userId, 
        carId, 
        expectedReturnDate
    }:IRequest) : Promise<Rental>{
        const carIsUnavaliable = await this.rentalsRepository.findOpenRentalByCar(carId);

        if(carIsUnavaliable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId);

        if(rentalOpenToUser){
            throw new AppError("There is a rental open to user");
        }

       const rental =  await this.rentalsRepository.create({
            userId,
            carId,
            expectedReturnDate
        });

        return rental;
    }
}

export {CreateRentalUseCase}


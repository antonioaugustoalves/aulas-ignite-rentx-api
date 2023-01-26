import { inject, injectable } from "tsyringe";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProviders";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { compare } from "bcrypt";

interface IRequest {
    carId: string;
    userId: string;
    expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
   
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}

    async execute({
        carId, 
        userId, 
        expectedReturnDate
    }:IRequest):Promise<Rental>{
        const minimumDuration = 24;
        const carAvaliable = await this
        .rentalsRepository.findOpenRentalByCar(carId);

        if(!carAvaliable){
            throw new AppError(
                "Car is not available"
            );
        }

        const rentalOpenByUser = this
        .rentalsRepository.findOpenRentalByUser(userId);

        if(rentalOpenByUser){
            throw new AppError(
                "There is an open rental by user"
            );
        }

        const dateNow = this.dateProvider.dateNow();

        const compareHours = 
        this.dateProvider.compareInHours(
            dateNow, expectedReturnDate
        );

        if(compareHours < minimumDuration){
            throw new AppError("Invalid return date");
        }

        const rental = this.rentalsRepository.create({
            userId, carId, expectedReturnDate,
        });

        await this.carsRepository.updateAvaliable(
            carId, false
        );

        return rental;


    }
}

export {CreateRentalUseCase}
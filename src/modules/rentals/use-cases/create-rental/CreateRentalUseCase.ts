
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProviders";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";


interface IRequest {
    userId: string;
    carId: string;
    expectedReturnDate: Date;

}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayJSProvider")
        private dateProvider: IDateProvider
    ){}
    async execute({
        userId, 
        carId, 
        expectedReturnDate
    }:IRequest) : Promise<Rental>{
        const minimumHour = 24;
        const carIsUnavaliable = await this.rentalsRepository.findOpenRentalByCar(carId);

        if(carIsUnavaliable){
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId);

        if(rentalOpenToUser){
            throw new AppError("There is a rental open to user");
        }

        //locação deve durar mais de 24hs
        const dateNow = this.dateProvider.dateNow();

        const  compare = this.dateProvider.compareInHours(
            dateNow,
            expectedReturnDate
           
        );
        

       

        const rental =  await this.rentalsRepository.create({
            userId,
            carId,
            expectedReturnDate
        });
       
        return rental;
    }
}

export {CreateRentalUseCase}


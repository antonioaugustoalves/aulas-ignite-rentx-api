import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { DayJSProvider } from "@shared/container/providers/implementations/DayJSProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
    id: string;
    userId: string;
}
@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsProvider")
        private dayjsProvider: DayJSProvider
    ) { }
    async execute({ id, userId }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.carId);
        const minimumDaily = 1;
        if (!rental) {
            throw new AppError("Rental not found.")
        }

        //Calula a duração do aluguel
        const dateNow = this.dayjsProvider.dateNow();

        let daily = this.dayjsProvider.compareInDays(
            rental.startDate, this.dayjsProvider.dateNow());
        
        let total = 0;

        const delay = this.dayjsProvider.compareInDays(
            dateNow, rental.expectedReturnDate
        );

        if (daily < 1) {
            daily = minimumDaily
        }

        if (delay > 0) {
            //calculando o total da multa
            const calculateFine = delay * car.fineAmount;
            total += calculateFine;
        }

        total += car.dailyRate * daily
        rental.endDate = this.dayjsProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvaliable(car.id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase }
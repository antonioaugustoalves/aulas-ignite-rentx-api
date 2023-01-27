import dayjs from "dayjs";
import { CarsRepositoryInMemory } from "@modules/car/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJSProvider } from "@shared/container/providers/implementations/DayJSProvider";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { AppError } from "@shared/errors/AppError";

let createRentalUseCase: CreateRentalUseCase;
let carsRepository: CarsRepositoryInMemory;
let rentalsRepository: RentalsRepositoryInMemory;
let dayjsProvider: DayJSProvider;
describe("Create a new  Rental",() =>{
    const returnDate = dayjs().add(1, "day").toDate();
    beforeEach(() =>{
        carsRepository = new CarsRepositoryInMemory();
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsProvider  = new DayJSProvider();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepository,  dayjsProvider,carsRepository
        );

    });

    // Testes Unitários
    it("it should able to create a rental",async() =>{
        const car = await carsRepository.create({
            name: "Celta",
            description: "Celta 1.0 Flex",
            dailyRate: 200.00,
            licensePlate: "IQQ2323",
            fineAmount: 100.00,
            brand: "GM",
            categoryId: "1234",
        });
        const rental = await createRentalUseCase.execute(
            {
                carId: car.id,
                userId:"0001",
                expectedReturnDate: returnDate
            }
        );

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("startDate");

    });

    it("should not be able to open a new rental if user already has a rental in progress", 
    async() =>{
        const car = await carsRepository.create({
            name: "Celta",
            description: "Celta 1.0 Flex",
            dailyRate: 200.00,
            licensePlate: "IQQ2323",
            fineAmount: 100.00,
            brand: "GM",
            categoryId: "1234",
        });
        await createRentalUseCase.execute({
            carId: car.id,
            userId:"000430",
            expectedReturnDate: returnDate

        });

        await expect(
            createRentalUseCase.execute({
                carId: "123",
                userId:"000430",
            expectedReturnDate: returnDate
            })
        ).rejects.toEqual(new AppError(
            "This user already has a rent in progress"
        ));
    });

    it("should not be able to open a new rental if car already is rented", 
    async() =>{
        const car = await carsRepository.create({
            name: "Celta",
            description: "Celta 1.0 Flex",
            dailyRate: 200.00,
            licensePlate: "IQQ2323",
            fineAmount: 100.00,
            brand: "GM",
            categoryId: "1234",
        });
        await createRentalUseCase.execute({
            carId: car.id,
            userId:"007153",
            expectedReturnDate: returnDate

        });

        await expect(
            createRentalUseCase.execute({
                carId: car.id,
                userId:"000430",
                expectedReturnDate: returnDate
            })
        ).rejects.toEqual(new AppError(
            "This car is unavaliable"
        ));
    })

    it("should not be able to create a rent if return date is less than 24 hs ",
    async() =>{
        const car = await carsRepository.create({
            name: "Celta",
            description: "Celta 1.0 Flex",
            dailyRate: 200.00,
            licensePlate: "IQQ2323",
            fineAmount: 100.00,
            brand: "GM",
            categoryId: "1234",
        });

        await expect(
            createRentalUseCase.execute({
                carId: car.id,
                userId:"000430",
                expectedReturnDate: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError("Invalid return date"));
    })
        
        
});
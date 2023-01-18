import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayJSProvider } from "@shared/container/providers/implementations/DayJSProvider";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayJSProvider;
describe("Create a car Rental", () =>{
    const dayAdd24Hs = dayjs().add(1, "day").toDate();
    beforeEach(() =>{
        rentalsRepository = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayJSProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepository, dayjsDateProvider);
    });

    it("should create a car rental", async() =>{
        const rental = await createRentalUseCase.execute({
            userId: "12345",
            carId: "ABC12334",
            expectedReturnDate: dayAdd24Hs
        });

        // console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("startDate");
    });

    it("should not be able to create rental if it already another to the same user", 
    async() =>{
        expect(async () =>{
            await createRentalUseCase.execute({
                userId: "12345",
                carId: "ABC12334",
                expectedReturnDate: dayAdd24Hs
            });
    
            await createRentalUseCase.execute({
                userId: "12345",
                carId: "ABC12334",
                expectedReturnDate: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create rental if it already another to the same car", 
    async() =>{
        expect(async () =>{
            await createRentalUseCase.execute({
                userId: "1234567",
                carId: "ABC12334",
                expectedReturnDate: new Date()
            });
    
            await createRentalUseCase.execute({
                userId: "12345",
                carId: "ABC12334",
                expectedReturnDate: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create rental if rental duration is less than 24Hs",
     async () =>{
        expect(async() =>{
            await createRentalUseCase.execute({
                userId: "12345",
                carId: "ABC12334",
                expectedReturnDate: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    });
});
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUsecase: CreateRentalUseCase;
describe("Create a car Rental", () =>{
    beforeEach(() =>{
        rentalsRepository = new RentalsRepositoryInMemory();
        createRentalUsecase = new CreateRentalUseCase(rentalsRepository);
    });

    it("should create a car rental", async() =>{
        const rental = await createRentalUsecase.execute({
            userId: "12345",
            carId: "ABC12334",
            expectedReturnDate: new Date()
        });

        console.log(rental);

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("startDate");
    });

    it("should not be able to create rental if it already another to the same user", 
    async() =>{
        expect(async () =>{
            await createRentalUsecase.execute({
                userId: "12345",
                carId: "ABC12334",
                expectedReturnDate: new Date()
            });
    
            await createRentalUsecase.execute({
                userId: "12345",
                carId: "ABC12334",
                expectedReturnDate: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to create rental if it already another to the same car", 
    async() =>{
        expect(async () =>{
            await createRentalUsecase.execute({
                userId: "1234567",
                carId: "ABC12334",
                expectedReturnDate: new Date()
            });
    
            await createRentalUsecase.execute({
                userId: "12345",
                carId: "ABC12334",
                expectedReturnDate: new Date()
            });
        }).rejects.toBeInstanceOf(AppError)
    });
});
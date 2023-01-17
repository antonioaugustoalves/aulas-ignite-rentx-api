import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUsecase: CreateRentalUseCase;
describe("Create a car Rental", () =>{
    beforeEach(() =>{
        rentalsRepository = new RentalsRepositoryInMemory();
        createRentalUsecase = new CreateRentalUseCase(rentalsRepository);
    });

    it("should create a car rental", async() =>{
        await createRentalUsecase.execute({
            userId: "12345",
            carId: "ABC12334",
            expectedReturnDate: new Date()
        });
    })
});
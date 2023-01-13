
import { CarsRepositoryInMemory } from "@modules/car/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCases";

let createCar: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("Create a car", () =>{
    beforeEach(() =>{
        carsRepository = new CarsRepositoryInMemory();
        createCar = new CreateCarUseCase(carsRepository);
    });

    it("should be able to create a car", async () =>{
        await createCar.execute({
            name: "Fusca 1400",
            description: "Volkswagen Fusca 1971",
            dailyRate: 200,
            licensePlate: "ABC1-C234",
            fineAmount: 50,
            brand: "VolksWagen",
            categoryId: "sample123"
        })
        
    });

    it("should not be able to create a car with an existent license plate", async() =>{
        expect(async() =>{
            await createCar.execute({
                name: "Fusca 1400",
                description: "Volkswagen Fusca 1971",
                dailyRate: 200,
                licensePlate: "ABC1-C234",
                fineAmount: 50,
                brand: "VolksWagen",
                categoryId: "sample123"
            });

            await createCar.execute({
                name: "Chevette",
                description: "Chevette 1987",
                dailyRate: 200,
                licensePlate: "ABC1-C234",
                fineAmount: 50,
                brand: "VolksWagen",
                categoryId: "sample123"
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})
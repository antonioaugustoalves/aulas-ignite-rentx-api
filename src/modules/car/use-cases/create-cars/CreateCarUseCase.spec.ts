import { CategoriesRepositoryInMemory } from "@modules/car/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCases";

let createCar: CreateCarUseCase;
let carsRepository: CategoriesRepositoryInMemory;
describe("Create a car", () =>{
    beforeEach(() =>{
        carsRepository = new CategoriesRepositoryInMemory();
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



    
    })
})
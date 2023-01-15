import { CarsRepositoryInMemory } from "@modules/car/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationsUseCase } from "./CreateCarSpecifications";

let carsRepository: CarsRepositoryInMemory;
let createCarSpecificationsUseCase: CreateCarSpecificationsUseCase;
describe("Create car specifications", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarSpecificationsUseCase = new CreateCarSpecificationsUseCase(carsRepository);
    });

    it("Should be able to add a specification to the car",
        async () => {
            const car = await carsRepository.create({
                name: "Fusca 1400",
            description: "Volkswagen Fusca 1971",
            dailyRate: 200,
            licensePlate: "ABC1-C234",
            fineAmount: 50,
            brand: "VolksWagen",
            categoryId: "sample123"
            });
            
            const specificationsId = ["AC112", "DH233", "CEA2332"];
            await createCarSpecificationsUseCase.execute({
                carId:car.id, specificationsId
            });
        });

    it("Should not be able to add a specification to the car that does not exist",
        async () => {
            expect(async () => {
                const carId = "123";
                const specificationsId = ["AC112", "DH233", "CEA2332"];
                await createCarSpecificationsUseCase.execute({
                    carId, specificationsId
                });
            }).rejects.toBeInstanceOf(AppError)
        });
});
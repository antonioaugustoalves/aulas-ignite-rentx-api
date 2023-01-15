import { CarsRepositoryInMemory } from "@modules/car/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase";

let listAvaliableCarsUseCase: ListAvaliableCarsUseCase;
let carsRepository: CarsRepositoryInMemory;
describe("List Avaliable cars", () => {


    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvaliableCarsUseCase = new ListAvaliableCarsUseCase(carsRepository);
    });

    it("Should be list all avaliable cars", async () => {
    
        const car = await carsRepository.create({
            name: "Kwid",
            description: "Renault Kwid Intense 2021",
            dailyRate: 500,
            licensePlate: "IZA4G44",
            brand: "Renault",
            fineAmount: 250,
            categoryId: "6ad8e85e-7c42-4fe8-befb-4d9f34fa21b8"
        });
    

        const cars = await listAvaliableCarsUseCase.execute({});
        console.log(cars);
        expect(cars).toEqual([car]);
    });

    it("Should be able to list cars by name", async () =>{
        const car = await carsRepository.create({
            name: "Kwid",
            description: "Renault Kwid Intense 2021",
            dailyRate: 500,
            licensePlate: "IZA4G44",
            brand: "Renault",
            fineAmount: 250,
            categoryId: "6ad8e85e-7c42-4fe8-befb-4d9f34fa21b8"
        });

        const cars = await listAvaliableCarsUseCase.execute({
            name: "Kwid"
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list cars by brand", async () =>{
        const car = await carsRepository.create({
            name: "Kwid",
            description: "Renault Kwid Intense 2021",
            dailyRate: 500,
            licensePlate: "IZA4G44",
            brand: "Renault",
            fineAmount: 250,
            categoryId: "6ad8e85e-7c42-4fe8-befb-4d9f34fa21b8"
        });

        const cars = await listAvaliableCarsUseCase.execute({
            brand: "Ford",
        });
        console.log(cars);
        expect(cars).toEqual([car]);
    });

    it("Should be able to list cars by categoryId", async () =>{
        const car = await carsRepository.create({
            name: "Kwid",
            description: "Kwid Intense 2021",
            dailyRate: 500,
            licensePlate: "IVT4R65",
            brand: "Renault",
            fineAmount: 250,
            categoryId: "a1"
        });

        const cars = await listAvaliableCarsUseCase.execute({
            categoryId: "a1",
        });
        console.log(cars);
        expect(cars).toEqual([car]);
    });

   
})
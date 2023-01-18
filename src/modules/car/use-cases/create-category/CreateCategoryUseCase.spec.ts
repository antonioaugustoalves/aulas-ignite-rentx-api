import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create category", () => {
    let categoriesRepository: CategoriesRepositoryInMemory;
    let createCategory: CreateCategoryUseCase;

    beforeEach(() => {
        categoriesRepository = new CategoriesRepositoryInMemory();
        createCategory = new CreateCategoryUseCase(categoriesRepository);
    });

    it("Should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Test description"
        }
        await createCategory.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepository.findByName(category.name);
        // console.log(categoryCreated);
        expect(categoryCreated).toHaveProperty("id")
    });

    it("Should not  be able to create a new category if it already exists", async () => {
        expect(async () =>{
            const category = {
                name: "Category Test",
                description: "Test description"
            }
            await createCategory.execute({
                name: category.name,
                description: category.description
            });
    
            await createCategory.execute({
                name: category.name,
                description: category.description
            });
        }).rejects.toBeInstanceOf(AppError)

        
    });


})
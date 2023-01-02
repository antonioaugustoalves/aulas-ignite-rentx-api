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
        console.log(categoryCreated);
        expect(categoryCreated).toHaveProperty("id")
    });


})
import { inject, injectable } from "tsyringe";
import { Category } from "@modules/car/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
        ){}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list();
        return categories;
    }
}
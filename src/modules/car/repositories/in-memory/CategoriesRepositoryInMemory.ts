import { Category } from "@modules/car/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories:Category[] = [];

    async create({ name, description }: ICategoryDTO): Promise<void> {
        const category = new Category();
        Object.assign(category, { name, description });
        this.categories.push(category);
    }
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name);
        return category;
    }
    async list(): Promise<Category[]> {
        const listAll = this.categories;
        return listAll;
    }
    
}

export {CategoriesRepositoryInMemory}
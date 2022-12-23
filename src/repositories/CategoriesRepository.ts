import { Category } from "../models/Category";
import { ICategoryDTO } from "./ICategoriesRepository";

export class CategoriesRepository implements CategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICategoryDTO): void {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            createdAt: new Date(),
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(category => category.name === name);
        return category
    }
}
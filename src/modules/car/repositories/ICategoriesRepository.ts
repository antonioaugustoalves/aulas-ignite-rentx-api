import { Category } from "../models/Category";

export interface ICategoryDTO {
    name: string;
    description: string;
}
export interface ICategoriesRepository {
    create({name, description}: ICategoryDTO): void;
    findByName(name: string):Category;
    list(): Category[];
}
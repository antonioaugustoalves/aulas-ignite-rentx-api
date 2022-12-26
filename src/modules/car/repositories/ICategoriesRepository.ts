import { Category } from "../entities/Category";

export interface ICategoryDTO {
    name: string;
    description: string;
}
export interface ICategoriesRepository {
    create({name, description}: ICategoryDTO): Promise<void>;
    findByName(name: string):Promise<Category>;
    list(): Promise<Category[]>;
}
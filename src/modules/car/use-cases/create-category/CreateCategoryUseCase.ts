import {injectable, inject} from "tsyringe"
import { AppError } from "@shared/errors/AppError";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
interface IRequest{
    name: string;
    description: string;
}
@injectable()
export class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository") 
        private categoriesRepository: ICategoriesRepository
        ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category already exists", 500);
        }

         await this.categoriesRepository.create({ name, description });
         
    }
}

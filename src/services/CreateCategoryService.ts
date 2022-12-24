import { ICategoriesRepository } from "../modules/car/repositories/ICategoriesRepository";

interface IRequest{
    name: string;
    description: string;
}
export class CreateCategoryService {
  
    constructor(private categoriesRepository: ICategoriesRepository){}

    execute({name, description}: IRequest): void {
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);
    
        if(categoryAlreadyExists){
            throw new Error("Category already exists");
        }
        
        this.categoriesRepository.create({name, description});
    }
}
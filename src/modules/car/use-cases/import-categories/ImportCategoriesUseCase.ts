import fs from "fs";
import { inject, injectable } from "tsyringe";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
interface IImportCategory {
    name: string;
    description: string;
}
@injectable()
export class ImportCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    //Carregar as categorias do arquivo csv
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) =>{
          const stream = fs.createReadStream(file.path)
          const categories: IImportCategory[] = []
          const parseFile = parse()
          
          stream.pipe(parseFile)
      
          parseFile.on("data", async (line) => {
            const [name, description] = line
            categories.push({
              name,
              description,
            })
          })
          .on("end", () =>{
            fs.promises.unlink(file.path)
            resolve(categories)
          })
          .on("error", (err) =>{
            reject (err)
          })
        })
      }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;
            const existCategory = await this.categoriesRepository.findByName(name);

            if (!existCategory) {
                console.log({name, description});
                this.categoriesRepository.create({
                    name, description
                });
            }
        });
    }
}
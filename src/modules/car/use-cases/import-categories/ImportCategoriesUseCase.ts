import fs from "fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
interface IImportCategories {
    name: string;
    description: string;
}
export class ImportCategoriesUseCase {
    constructor(
        private categoriesRepository: ICategoriesRepository
    ) { }

    //Carregar as categorias do arquivo csv
    loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();
            const categories: IImportCategories[] = [];
            stream.pipe(parseFile);
            parseFile.on("data", async line => {
                // console.log(line);
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            }).on("end", () => {
                resolve(categories);
            }).on("error", (err) => {
                reject(err);
            });
        });
    }
    async execute(file: Express.Multer.File): Promise<void>  {
        const categories = await this.loadCategories(file);
        console.log(categories);
    }
}
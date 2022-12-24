import fs from "fs";
import {parse} from "csv-parse";
export class ImportCategoriesUseCase {
    execute(file: Express.Multer.File): void{
        const stream = fs.createReadStream(file.path);
        const parseFile = parse();
        stream.pipe(parseFile);
        parseFile.on("data", async line =>{
            console.log(line);
        });
    }
}
import { Request,Response } from "express";
import { container } from "tsyringe";
import { UploadImagesUseCase } from "./UploadImagesUseCase";
interface IFiles {
    filename: string;
}
class UploadImagesController {
    async handle(request: Request, response: Response): Promise<Response>{
        const uploadImageUseCase = container.resolve(UploadImagesUseCase);
        const {id} =  request.params;
        const images = request.files as IFiles[];
        const filenames = images.map(image => image.filename);
        const carImage = uploadImageUseCase.execute({
            carId: id,
            imagesName: filenames
        });

        return response.status(201).send("Done!")
    }
}

export {UploadImagesController}
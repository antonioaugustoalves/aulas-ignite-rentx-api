import { ICarImagesRepository } from "@modules/car/repositories/ICarImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    carId: string;
    imagesName: string[];
}
@injectable()
class UploadImagesUseCase {
    constructor(
        @inject("CarImagesRepository")
        private carImagesRepository: ICarImagesRepository
    ){}
    async execute({carId, imagesName}: IRequest): Promise<void> {
        imagesName.map(async (image) =>{
            await this.carImagesRepository.create(carId, image);
        })
    }
}

export {UploadImagesUseCase}
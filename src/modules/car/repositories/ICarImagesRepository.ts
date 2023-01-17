import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarImagesRepository {
    create(carId: string, imageName: string): Promise<CarImage>;
}

export {ICarImagesRepository}
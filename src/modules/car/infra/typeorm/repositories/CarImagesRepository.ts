import { ICarImagesRepository } from "@modules/car/repositories/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";


class CarImagesRepository implements ICarImagesRepository {
    private repository: Repository<CarImage>;

    constructor(){
        this.repository = getRepository(CarImage);
    }


    async create(carId: string, imageName: string): Promise<CarImage> {
        const carImage =  this.repository.create(
            {carId, imageName}
        );

        await this.repository.save(carImage);
        return carImage;
    }

}

export {CarImagesRepository}
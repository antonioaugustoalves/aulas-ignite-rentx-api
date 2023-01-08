import { ICarDTO } from "../dtos/ICarDTO";

interface ICarsRepository {
    create(data: ICarDTO): Promise<void>;
}

export {ICarsRepository}
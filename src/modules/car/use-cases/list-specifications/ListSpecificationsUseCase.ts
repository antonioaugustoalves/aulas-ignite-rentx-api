import {inject, injectable} from "tsyringe";
import { Specification } from "@modules/car/entities/Specification";
import { ISpecificationsRepository } from "@modules/car/repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ){}
    async execute():Promise<Specification[]>{
        const specifications = await this.specificationsRepository.list();
        return specifications;
    }
}
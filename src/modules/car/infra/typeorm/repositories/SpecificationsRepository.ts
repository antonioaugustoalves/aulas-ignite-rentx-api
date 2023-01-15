import {Repository, getRepository} from "typeorm"
import { Specification } from "@modules/car/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "@modules/car/repositories/ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
   
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications;
    }

    
    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({
            name, description
        });
        await this.repository.save(specification);
        return specification;
    }
    async list(): Promise<Specification[]> {
        const all = await this.repository.find();
        return all;
    }
    async findByName(name: string): Promise<Specification >{
        const specification = this.repository.findOne({name});
        return specification;
    }

}
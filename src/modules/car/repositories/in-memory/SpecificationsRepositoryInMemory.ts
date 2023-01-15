import { Specification } from "@modules/car/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specfication = new Specification();
        Object.assign(specfication, { name, description });
        this.specifications.push(specfication);
        return specfication;
    }
    async list(): Promise<Specification[]> {
        return this.specifications;
    }
    async findByName(name: string): Promise<Specification> {
        const specfication = await this.specifications.find(specification => specfication.name === name);
        return specfication;
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const listSpecs = this.specifications
        .filter((specification) => ids.includes(specification.id));
        return listSpecs;
    }
    

}

export {SpecificationsRepositoryInMemory}
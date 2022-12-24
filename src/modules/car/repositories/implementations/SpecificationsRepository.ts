import { Specification } from "../../models/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationRepository {
    private specifications: Specification[];
    private static INSTANCE: SpecificationsRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }

        return SpecificationsRepository.INSTANCE;

    }
    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();
        Object.assign(specification,
            { name, description, createdAt: new Date() }
        );
        this.specifications.push(specification);
    }
    list(): Specification[] {
        return this.specifications;
    }
    findByName(name: string): Specification {
        const specification = this.
            specifications.
            find(specification => specification.name === name);
        return specification;
    }

}
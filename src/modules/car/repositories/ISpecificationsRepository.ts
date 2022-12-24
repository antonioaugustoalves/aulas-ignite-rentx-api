import { Specification } from "../models/Specification";

export interface ICreateSpecificationDTO {
    name: string;
    description: string;
}
export interface ISpecificationRepository {
    create({name, description}: ICreateSpecificationDTO): void;
    list(): Specification[]
    findByName(name: string): Specification;
}
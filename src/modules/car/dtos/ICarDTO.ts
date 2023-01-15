import { Specification } from "../infra/typeorm/entities/Specification";

interface ICarDTO {
    name: string;
    description: string;
    dailyRate: number;
    licensePlate: string;
    fineAmount: number;
    brand: string;
    categoryId: string;
    specifications?: Specification[];
    id?: string;
}

export {ICarDTO}
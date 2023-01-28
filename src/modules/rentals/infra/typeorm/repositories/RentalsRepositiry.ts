import { IRentalDTO } from "@modules/rentals/dto/IRentalDTO";
import { getRepository, Repository } from "typeorm";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor(){
        this.repository = getRepository(Rental);
    }
   
    
    async create({
        userId,
        carId,
        expectedReturnDate,
        id,
        endDate,
        total
    }: IRentalDTO): Promise<Rental> {
        const rental =  this.repository.create(
            {
                userId, carId, expectedReturnDate,
                id, endDate, total
            }
        );
        await this.repository.save(rental);
        return rental;
    }

    async findOpenRentalByCar(carId: string): Promise<Rental> {
        const openByCar = await this.repository.findOne({
            where: {carId, endDate: null}
        });
        return openByCar;
    }

    async findOpenRentalByUser(userId: string): Promise<Rental> {
        const openByUser = await this.repository.findOne({
           where: {userId, endDate: null},
        });

        return openByUser;
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);
        return rental;
    }

    async findByUserId(userId: string): Promise<Rental[]> {
        const rentalsByUser = 
        await this.repository.find({
            where:{userId},
            relations:["car"]
        });

        return rentalsByUser;
    }
}

export {RentalsRepository}
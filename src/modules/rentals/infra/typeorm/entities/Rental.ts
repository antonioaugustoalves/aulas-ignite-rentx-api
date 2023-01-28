import { Car } from "@modules/car/infra/typeorm/entities/Car";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";

@Entity("Rentals")
class Rental {
    @PrimaryColumn()
    id: string;
    @Column()
    carId: string;
    @ManyToOne(() => Car)
    @JoinColumn({name:"carId"})
    car: Car;
    @Column()
    userId: string;
    @Column()
    startDate: Date;
    @Column()
    endDate: Date;
    @Column()
    expectedReturnDate: Date;
    @Column()
    total: number;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }

}

export {Rental}
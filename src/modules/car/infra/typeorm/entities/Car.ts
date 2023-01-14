import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";
@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    dailyRate: number;
    @Column()
    avaliable = true;
    @Column()
    licensePlate: string;
    @Column()
    fineAmount: number;
    @Column()
    brand: string;
    @Column()
    categoryId: string;
    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id) {
            this.id = uuidv4();
            this.createdAt = new Date();
        }
    }

}

export {Car}
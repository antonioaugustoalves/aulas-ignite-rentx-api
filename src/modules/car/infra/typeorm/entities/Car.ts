import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { Category } from "./Category";
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
    // relacionamento entre categoria e carro
    @ManyToOne(() => Category)
    @JoinColumn({name: "categoryId"})
    category: Category
    @Column()
    categoryId: string;
    @CreateDateColumn()
    createdAt = new Date();

    constructor(){
        if(!this.id) {
            this.id = uuidv4();
            
        }
    }

}

export {Car}
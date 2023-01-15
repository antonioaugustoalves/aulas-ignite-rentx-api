import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { Category } from "./Category";
import { Specification } from "./Specification";
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
    avaliable: boolean;
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
    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_car",
        joinColumns:[{name:"carId"}],
        inverseJoinColumns:[{name:"specificationId"}]
    })
    specifications: Specification[];
    @CreateDateColumn()
    createdAt = new Date();

    constructor(){
        if(!this.id) {
            this.id = uuidv4();
            this.avaliable = true;
            
        }
    }

}

export {Car}
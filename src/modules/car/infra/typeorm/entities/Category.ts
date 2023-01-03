import {v4 as uuidv4} from "uuid";
import {Entity, Column, PrimaryColumn, CreateDateColumn} from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryColumn()
    id?: string;
    @Column()
    name: string;
    @Column()
    description: string;
    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}
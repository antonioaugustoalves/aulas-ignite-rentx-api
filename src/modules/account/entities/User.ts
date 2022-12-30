import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";

@Entity("users")
 class User {
    @PrimaryColumn()
    id?: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    driverLicense: string;
    @Column()
    isAdmin: boolean;
    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}

export {User}
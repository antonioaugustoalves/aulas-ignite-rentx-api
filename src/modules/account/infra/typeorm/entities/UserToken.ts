import {v4 as uuidv4} from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("users_tokens")
class UserToken {
    @PrimaryColumn()
    id :string;

    @Column()
    refreshToken :string;

    @Column()
    userId: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "userId"})
    user: User;
    
    @Column()
    expirationDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}

export {UserToken}
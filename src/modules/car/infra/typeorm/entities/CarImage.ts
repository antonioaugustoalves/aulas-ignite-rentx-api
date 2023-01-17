import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuidv4} from "uuid";
@Entity("car_images")
class CarImage {
    @PrimaryColumn()
    id: string;
    @Column()
    carId: string;
    @Column()
    imageName: string;
    @CreateDateColumn()
    createdAt: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}

export {CarImage}
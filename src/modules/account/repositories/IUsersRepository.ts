import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

export interface IUsersRepository {
    create(data:ICreateUserDTO): Promise<void>;
    list(): Promise<User[]>;
    findByEmail(email:string): Promise<User>;
    findBtId(id:string): Promise<User>;
}
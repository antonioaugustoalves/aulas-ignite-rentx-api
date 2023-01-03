import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;
    constructor(){
        this.repository = getRepository(User);
    }
    
    async create({id,name, email, password, driverLicense, avatarUrl}: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            id, name, email, password, driverLicense, avatarUrl
        });

        await this.repository.save(user);
    }
    

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne( id );
        return user;
    }
    
    
}

export {UsersRepository}
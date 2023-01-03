import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{
    usersRepository:User[] = [];
    async create({name, email, password, driverLicense}: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name, email, password, driverLicense
        });

        this.usersRepository.push(user);
    }
    async findByEmail(email: string): Promise<User> {
        return this.usersRepository.find(user => user.email === email)
    }
    async findById(id: string): Promise<User> {
        return this.usersRepository.find(user => user.id === id);
    }

}

export {UsersRepositoryInMemory}
import { inject, injectable } from "tsyringe"; 
import {hash} from "bcrypt";
import { UsersRepository } from "../../repositories/implementation/UsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ){}
    async execute({name, email, password, driverLicense}:ICreateUserDTO): Promise<void>{
        const passwordHash = await hash(password, 8)
        await this.usersRepository.create({
            name, email, password: passwordHash, driverLicense
        })
    }
}

export {CreateUserUseCase}
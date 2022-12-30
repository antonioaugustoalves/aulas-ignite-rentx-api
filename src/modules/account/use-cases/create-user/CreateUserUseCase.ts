import { inject, injectable } from "tsyringe"; 
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
        await this.usersRepository.create({
            name, email, password, driverLicense
        })
    }
}

export {CreateUserUseCase}
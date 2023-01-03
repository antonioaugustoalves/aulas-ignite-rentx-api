import { inject, injectable } from "tsyringe"; 
import { AppError } from "@errors/AppError";
import {hash} from "bcrypt";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";


@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({name, email, password, driverLicense}:ICreateUserDTO): Promise<void>{
        const userExists = await this.usersRepository.findByEmail(email);
        
        if(userExists){
            throw new AppError("User already exists");
        }
        
        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({
            name, email, password: passwordHash, driverLicense
        })
    }
}

export {CreateUserUseCase}
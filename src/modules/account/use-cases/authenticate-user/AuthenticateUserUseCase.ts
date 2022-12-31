import { inject, injectable } from "tsyringe";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse {
    user:{
        name: string,
        email: string
    };
    token: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({email, password}: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("E-mail or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("E-mail or password incorrect");
        }

        const token = sign({}, "5b6d2f7652a73194d5fd47c13c1ed886",
        {subject: user.id, expiresIn: "1d"});

        const tokenReturn: IResponse = {
            token,
            user:{name: user.name, email: user.email}
        }

        return tokenReturn
    }


}  

export {AuthenticateUserUseCase}
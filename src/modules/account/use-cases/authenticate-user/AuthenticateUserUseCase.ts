import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import {compare} from "bcrypt";
import {sign} from "jsonwebtoken";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProviders";



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
    refreshToken: string;
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UserTokensRepository")
        private userTokensRepository: IUserTokensRepository,
        @inject("DayjsProvider")
        private dayjsProvider: IDateProvider
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

        const token = sign({}, auth.secretToken,
        {subject: user.id, expiresIn: auth.expiresIn});
        const refreshToken = sign({email},
            auth.secretRefreshToken, {
                subject: user.id,
                expiresIn: auth.expiresInRefreshToken
            });
        const tokenExpiresDate = this.dayjsProvider.addDays(30)
        await this.userTokensRepository.create({
            expirationDate: tokenExpiresDate,
            refreshToken,
            userId:user.id,
        });

        const tokenReturn: IResponse = {
            token,
            user:{name: user.name, email: user.email},
            refreshToken
        }

        return tokenReturn
    }


}  

export {AuthenticateUserUseCase}
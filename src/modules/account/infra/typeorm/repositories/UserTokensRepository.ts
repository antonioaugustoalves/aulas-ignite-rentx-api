import { getRepository, Repository } from "typeorm";
import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTO";
import { IUserTokensRepository } from "@modules/account/repositories/IUserTokensRepository";
import { UserToken } from "../entities/UserToken";

class UserTokensRepository implements IUserTokensRepository{
    private repository: Repository<UserToken>;

    constructor(){
        this.repository = getRepository(UserToken);
    }
    async create({ userId, refreshToken, expirationDate }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken =  this.repository.create(
            {
                userId, refreshToken, expirationDate
            }
        );

        await this.repository.save(userToken);
        return userToken;
    }
    
}

export { UserTokensRepository }
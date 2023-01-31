import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { UserToken } from "../infra/typeorm/entities/UserToken"

interface IUserTokensRepository {
    create({
        userId, 
        refreshToken,
        expirationDate
    }:ICreateUserTokenDTO):Promise<UserToken>
}

export {IUserTokensRepository}
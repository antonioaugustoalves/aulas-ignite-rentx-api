import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";

interface IPayload {
    sub: string;
}
export async function ensureAuthentication(
    request:Request, response:Response, next:NextFunction) {
        const authHeader = request.headers.authorization;

        if(!authHeader){
            throw new AppError("Token missing",401)
        }
        const [, token] = authHeader.split(" ");
       
        try{
            const {sub: userId} = verify(token,"5b6d2f7652a73194d5fd47c13c1ed886") as IPayload;
            const usersRepository = new UsersRepository();
            const user = await usersRepository.findById(userId);

            if(!user){
                throw new AppError("User not found",401);
            }

            request.user = {
                id: userId
            }
            
            next();
        }catch{
            throw new AppError("Invalid token",401);
        }

}
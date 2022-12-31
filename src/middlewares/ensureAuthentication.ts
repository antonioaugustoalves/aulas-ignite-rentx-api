import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/account/repositories/implementation/UsersRepository";

interface IPayload {
    sub: string;
}
export async function ensureAuthentication(
    request:Request, response:Request, next:NextFunction) {
        const authHeader = request.headers.authorization;

        if(!authHeader){
            throw new AppError("Token missing",401)
        }
        const [, token] = authHeader.split(" ");
       
        try{
            const {sub: user_id} = verify(token,"5b6d2f7652a73194d5fd47c13c1ed886") as IPayload;
            const usersRepository = new UsersRepository();
            const user = await usersRepository.findById(user_id);

            if(!user){
                throw new AppError("User not found",401);
            }
            next();
        }catch{
            throw new AppError("Invalid token",401);
        }

}
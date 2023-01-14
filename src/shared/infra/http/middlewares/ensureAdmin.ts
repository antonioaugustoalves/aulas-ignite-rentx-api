import {Request, Response, NextFunction} from "express";
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
    request:Request, 
    response:Response, 
    next:NextFunction
) {
    const {id} = request.user;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if(!user.isAdmin){
        throw new AppError("You must be an administrator to use this feature")
    }

    return next();

}
import {Request, Response, NextFunction} from "express";
import {verify} from "jsonwebtoken";
export async function ensureAuthentication(
    request:Request, response:Request, next:NextFunction) {
        const authHeader = request.headers.authorization;

        if(!authHeader){
            throw new Error("Token missing")
        }
        const [, token] = authHeader.split(" ");
       
        try{
            const decode = verify(token,"5b6d2f7652a73194d5fd47c13c1ed886");
            console.log(decode);
            next();
        }catch{
            throw new Error("Invalid token");
        }

}
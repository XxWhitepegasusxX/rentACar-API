import { verify } from 'jsonwebtoken'

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction){

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")
    try{

        const { sub: user_id } = verify(token, "a7e071b3de48cec1dd24de6cbe6c7bf1") as IPayload

        const usersRepository = new UsersRepository()

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new AppError("User not found", 401)
        }
        
        req.user = {
            id: user_id
        }

        next()

    }catch(e){

        throw new AppError("Invalid Token!", 401)

    }
}
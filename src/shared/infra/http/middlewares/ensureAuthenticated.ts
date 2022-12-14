import { verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

import { UsersTokensRepository } from '@modules/accounts/infra/prismaorm/repositories/UsersTokensRepository';
import { AppError } from "@shared/errors/AppError";
import auth from '@config/auth';

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

        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;
        
        req.user = {
            id: user_id
        }

        next()

    }catch(e){

        throw new AppError("Invalid Token!", 401)

    }
}
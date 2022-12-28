import { prisma } from '@shared/services/prismaClient';
import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { PrismaClient, User_token } from "@prisma/client";
import { AppError } from '@shared/errors/AppError';

class UsersTokensRepository implements IUsersTokensRepository{

    private prisma: PrismaClient

    constructor(){
        this.prisma = prisma
    }

    async findByRefreshToken(token: string): Promise<User_token> {
        return await this.prisma.user_token.findFirst({
            where: {
                refresh_token: token
            }
        })
    }

    async deleteById(id: string): Promise<void> {
        await this.prisma.user_token.delete({
            where: {
                id
            }
        })
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<User_token> {
        return await this.prisma.user_token.findFirst({
            where: {
                user_id,
                refresh_token
            }
        })
    }

    async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<User_token> {
        try{
            return await this.prisma.user_token.create({
                data: {
                    user_id,
                    refresh_token,
                    expires_date
                }
            })
        }catch(e){
            throw new AppError(e)
        }
    }

}

export { UsersTokensRepository }
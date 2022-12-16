import { prisma } from '@shared/services/prismaClient';
import { PrismaClient, Users } from "@prisma/client";
import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository{
    
    private prisma: PrismaClient

    constructor(){
        this.prisma = prisma
    }

    async create({name, email, driver_license, password}: ICreateUserDTO): Promise<void>{
        try{
            await prisma.users.create({
                data: {
                    name,
                    email,
                    driver_license,
                    password
                }
            })
        }catch(e){
            throw new AppError(`Error in creating account, error: ${e}`)
        }
    }

    async updateAvatar(id: string, data: string): Promise<void> {
        try{
            await prisma.users.update({
                where: {id: id},
                data: {avatar: data}
            })
        }catch(e){
            throw new AppError(e)
        }
    }

    async findByEmail(email: string): Promise<Users>{
        const user = await prisma.users.findUnique({where: {email}})

        return user
    }

    async findById(id: string): Promise<Users>{
        const user = await prisma.users.findUnique({where: {id}})

        return user;
    }
}

export { UsersRepository}
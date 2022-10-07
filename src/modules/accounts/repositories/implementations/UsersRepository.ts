import { PrismaClient, Users } from "@prisma/client";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository{
    
    private prisma: PrismaClient 

    constructor(){
        this.prisma = new PrismaClient()
    }

    async create({name, email, driver_license, password}: ICreateUserDTO): Promise<void>{
        try{
            await this.prisma.users.create({
                data: {
                    name,
                    email,
                    driver_license,
                    password
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    async findByEmail(email: string): Promise<Users>{
        const user = await this.prisma.users.findUnique({where: {email}})

        return user
    }

    async findById(id: string): Promise<Users>{
        const user = await this.prisma.users.findUnique({where: {id}})

        return user;
    }
}

export { UsersRepository}
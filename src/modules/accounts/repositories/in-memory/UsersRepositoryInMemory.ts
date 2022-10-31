import { Users } from "@prisma/client";
import { v4 } from "uuid";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{
    users: Users[] = []
    
    async create({driver_license, email, name, password}: ICreateUserDTO): Promise<void> {
        const user: Users = {
            driver_license,
            email,
            name,
            password,
            id: v4(),
            isAdmin: false,
            created_at: new Date(),
            avatar: null
        }
        this.users.push(user)
    }

    async updateAvatar(id: string, data: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<Users> {
        return this.users.find(user => user.email === email)
    }
    
    async findById(id: string): Promise<Users> {
        return this.users.find(user => user.id === id)
    }

}
export { UsersRepositoryInMemory }
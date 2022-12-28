import { Users } from "@prisma/client"
import { ICreateUserDTO } from "../dtos/ICreateUserDTO"

interface IUsersRepository{
    create(data: ICreateUserDTO): Promise<void>
    updateAvatar(id: string, data: string): Promise<void>
    updatePassword(id: string, newPassword: string): Promise<void>
    findByEmail(email: string): Promise<Users>
    findById(id: string): Promise<Users>
}

export { IUsersRepository }
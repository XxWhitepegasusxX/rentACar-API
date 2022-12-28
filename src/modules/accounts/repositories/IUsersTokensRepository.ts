import { User_token } from "@prisma/client"
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"

interface IUsersTokensRepository{

    create({user_id, refresh_token, expires_date}: ICreateUserTokenDTO): Promise<User_token>
    findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<User_token>;
    deleteById(id: string): Promise<void>;
    findByRefreshToken(token: string): Promise<User_token>
}

export { IUsersTokensRepository }
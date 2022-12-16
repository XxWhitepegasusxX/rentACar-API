import { inject, injectable } from "tsyringe";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

interface IPayload{
    sub: string;
}

@injectable()
class RefreshTokenUseCase{
    constructor(@inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository){}

    async execute(token: string){
        const decode = verify(token, auth.secret_refresh_token) as IPayload;

        const user_id = decode.sub;

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

        if(!userToken){
            throw new AppError("Refresh Token does not exists!")
        }

        await this.usersTokensRepository.deleteById(userToken.id)

    }

}

export { RefreshTokenUseCase }
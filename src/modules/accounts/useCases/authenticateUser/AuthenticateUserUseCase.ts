import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase{
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}
    
    async execute({email, password}: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect!", 401);
        }

        const passwordMatch = await compare(password, user.password)
    
        if(!passwordMatch){
            throw new AppError("Email or password incorrect!", 401);
        }

        const token = await sign({}, "a7e071b3de48cec1dd24de6cbe6c7bf1", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
            
        }
        return tokenReturn

}
}

export { AuthenticateUserUseCase }
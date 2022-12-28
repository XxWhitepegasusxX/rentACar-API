import { inject, injectable } from "tsyringe";
import { v4 } from "uuid";
import { resolve } from "path";

import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";

@injectable()
class SendForgotPasswordMailUseCase{
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository, @inject("UsersTokensRepository") private usersTokensRepository: IUsersTokensRepository, @inject("DayjsDateProvider") private dateProvider: IDateProvider, @inject("EtherealMailProvider") private mailProvider: IMailProvider){}

    async execute(email: string){
        const user = await this.usersRepository.findByEmail(email);

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "ForgotPassword.hbs")

        if(!user){
            throw new AppError("User does not exist!")
        }
        
        const token = v4();

        const expires_date = this.dateProvider.addHours(3);
        
        await this.usersTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        })

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(email, "Forgot your password", variables, templatePath)
    }
}

export { SendForgotPasswordMailUseCase }
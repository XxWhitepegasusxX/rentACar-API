import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { deleteFile } from '../../../../utils/file'

interface IRequest{
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase{
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}
    
    async execute({user_id, avatar_file}: IRequest): Promise<void>{
        //const user = await this.usersRepository.findById(user_id);
        //const avatar = avatar_file
        //user.avatar = avatar_file
        if(avatar_file){
            await deleteFile(`./tmp/avatar/${avatar_file}`)
        }
        await this.usersRepository.updateAvatar(user_id, avatar_file)
    }
}

export { UpdateUserAvatarUseCase }
// Adicionar coluna avatar na tabela de users
// Configuração upload multer
// refatorar usuário com coluna avatar
// Criar regra de negócio do upload
// Criar Controller
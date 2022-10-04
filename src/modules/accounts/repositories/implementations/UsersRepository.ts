import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository{
    
    create(data: ICreateUserDTO): Promise<void>{
        
    }
}
export { UsersRepository}
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rentals } from "@prisma/client";
import { inject, injectable } from "tsyringe";

@injectable()
class ListRentalsByUserUseCase{
    constructor(@inject("RentalsRepository") private rentalsRepository: IRentalsRepository, @inject("UsersRepository") private userRepository: IUsersRepository){}

    async execute(user_id: string): Promise<Rentals[]>{

        const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

        return rentalsByUser;
    }
}

export { ListRentalsByUserUseCase }
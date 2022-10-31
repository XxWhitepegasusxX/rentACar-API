import { Rentals } from "@prisma/client"
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO"

interface IRentalsRepository{
    findOpenRentalByCar(car_id: string): Promise<Rentals>
    findOpenRentalByUser(user_id: string): Promise<Rentals>
    create(data: ICreateRentalDTO): Promise<Rentals>
}

export { IRentalsRepository }
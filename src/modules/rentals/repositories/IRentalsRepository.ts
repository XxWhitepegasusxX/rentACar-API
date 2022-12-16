import { Rentals } from "@prisma/client"
import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO"

interface IRentalsRepository{
    create(data: ICreateRentalDTO): Promise<Rentals>
    update(id: string, data: any): Promise<Rentals>
    findOpenRentalByCar(car_id: string): Promise<Rentals>
    findOpenRentalByUser(user_id: string): Promise<Rentals>
    findById(id: string): Promise<Rentals>
    findByUser(id: string): Promise<Rentals[]>;
}

export { IRentalsRepository }
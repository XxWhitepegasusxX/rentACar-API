import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rentals } from "@prisma/client";
import { v4 } from "uuid";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository{
    
    rentals: Rentals[] = [];
    
    async findOpenRentalByCar(car_id: string): Promise<Rentals> {
        return this.rentals.find(rental => rental.car_id === car_id && rental.end_date === null); 
    }
    
    async findOpenRentalByUser(user_id: string): Promise<Rentals> {
        return this.rentals.find(rental => rental.user_id === user_id && rental.end_date === null); 
    }
    
    async create({car_id, user_id, expected_return_date}: ICreateRentalDTO): Promise<Rentals> {
        
        const rental: Rentals = {
            id: v4(),
            car_id,
            user_id,
            start_date: new Date(),
            end_date: new Date(),
            expected_return_date,
            total: 100,
            created_at: new Date(),
            updated_at: undefined
        }

        return rental
    }


}

export { RentalsRepositoryInMemory }
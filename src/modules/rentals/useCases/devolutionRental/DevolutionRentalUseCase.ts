import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rentals } from "@prisma/client";

interface IRequest{
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
    constructor(@inject("RentalsRepository") private rentalsRepository: IRentalsRepository, @inject("CarsRepository") private carsRepository: ICarsRepository, @inject("DayjsDateProvider") private dateProvider: IDateProvider){}

    async execute({id, user_id}: IRequest): Promise<Rentals>{
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(rental.car_id)
        const minimun_daily = 1;
        let total = 0

        if(!rental){
            throw new AppError("Rental not found!")
        }

        const dateNow = this.dateProvider.dateNow()

        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow)

        if(daily <= 0){
            daily = minimun_daily;
        }
        
        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date)
        
        if(delay > 0){
            const calculate_fine = delay * car.fine_amount;
            total += calculate_fine;
        }

        total += daily * car.daily_rate;

        const data = {end_date: dateNow, total}

        await this.carsRepository.updateAvailable(car.id, true)
        return await this.rentalsRepository.update(id, data)

    }
}

export { DevolutionRentalUseCase }
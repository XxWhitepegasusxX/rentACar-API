import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { Rentals } from "@prisma/client";

import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

dayjs.extend(utc)

interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase{
    constructor(@inject("DayjsDateProvider") private dateProvider: IDateProvider, @inject("RentalsRepository") private rentalsRepository: IRentalsRepository, @inject("CarsRepository") private carsRepository: ICarsRepository){}
    
    async execute({user_id, car_id, expected_return_date}: IRequest): Promise<Rentals>{
        
        const compareHours = 24

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        
        if(carUnavailable){
            throw new AppError("Car is unavailable")
        }
        
        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)
        
        if(rentalOpenToUser){
            throw new AppError("There is a rental in progress for user!")
        }
        
        const dateNow = this.dateProvider.dateNow()

        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)
        
        if(compare < compareHours){
            throw new AppError("Expected return date must be more than 24 hours")
        }
        
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        })

        await this.carsRepository.updateAvailable(car_id, false)
        
        return rental
    }
}

export { CreateRentalUseCase }
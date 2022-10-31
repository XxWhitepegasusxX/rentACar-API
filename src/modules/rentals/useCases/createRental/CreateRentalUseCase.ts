import { inject, injectable } from "tsyringe";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { Rentals } from "@prisma/client";

dayjs.extend(utc)

interface IRequest{
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase{
    constructor(private rentalsRepository: IRentalsRepository){}
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
        
        const dateNow = dayjs().utc().local().format();
        
        const expectedReturnDateFormat = dayjs(expected_return_date).utc().local().format();
        
        const compare = dayjs(expected_return_date).diff(dateNow, "hours")
        
        if(compare < compareHours){
            throw new AppError("Expected return date must be more than 24 hours")
        }
        
        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        })
        return rental
    }
}

export { CreateRentalUseCase }
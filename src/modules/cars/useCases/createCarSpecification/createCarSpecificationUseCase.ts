import { inject, injectable } from "tsyringe";
import { Car } from "@prisma/client";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest{
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase{

    constructor(@inject("CarsRepository") private carsRepository: ICarsRepository, @inject("SpecificationsRepository") private specificationsRepository: ISpecificationsRepository){}

    async execute({ car_id, specifications_id}: IRequest): Promise<Car>{

        const carExists = await this.carsRepository.findById(car_id)

        if(!carExists){
            throw new AppError("Car does not exist")
        }

        specifications_id.forEach(async specificationId => { 
            await this.carsRepository.addSpecification(car_id, specificationId)
        })

        return await this.carsRepository.findById(car_id);
    }
}

export { CreateCarSpecificationUseCase }
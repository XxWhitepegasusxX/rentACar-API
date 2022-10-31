import { inject, injectable } from "tsyringe";

import { Car_images } from "@prisma/client";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest{
    car_id: string,
    images_name: string[],
}

@injectable()
class UploadCarImagesUseCase{

    constructor(@inject("CarsImagesRepository") private carsImagesRepository: ICarsImagesRepository){}
    
    async execute({car_id, images_name}: IRequest): Promise<void>{
        
        images_name.map( async ( image ) => {
            await this.carsImagesRepository.create(car_id, image)

        })
    }
}

export { UploadCarImagesUseCase }
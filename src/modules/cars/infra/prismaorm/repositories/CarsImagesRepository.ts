import { Car_images, PrismaClient } from "@prisma/client";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { prisma } from "@shared/services/prismaClient";

class CarsImagesRepository implements ICarsImagesRepository{
    
    private prisma: PrismaClient

    constructor(){
        this.prisma = prisma
    }

    async create(car_id: string, image_name: string): Promise<Car_images> {
        try{
            return await this.prisma.car_images.create({
                data: {
                    car_id,
                    image_name
                }
            })
        }catch(e){
            console.log(e)
        }
    }

    

}

export { CarsImagesRepository }
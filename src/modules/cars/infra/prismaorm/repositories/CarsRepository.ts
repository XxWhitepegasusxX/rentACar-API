import { Car, PrismaClient } from "@prisma/client";
import { prisma } from '@shared/services/prismaClient'

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

class CarsRepository implements ICarsRepository{

    private prisma: PrismaClient

    constructor(){
        this.prisma = prisma
    }

    async updateAvailable(id: string, available: boolean): Promise<void> {
        await this.prisma.car.update({
            where: {id},
            data: {available: available}
        })
    }

    async addSpecification(car_id: string, specification_id: string): Promise<Car> {
        try{
            await this.prisma.specification_cars.create({
                data: {
                    car_id,
                    specification_id
                }
            })
            return this.prisma.car.findUnique({
                where: {id: car_id},
                include: {specifications_id: true}
            })

        }catch(e){
            console.log(e)
        }
            
    }

    findById(id: string): Promise<Car> {
        return this.prisma.car.findUnique({
            where: {id},
            include: {specifications_id: true}
        })
    }

    async create(data: ICreateCarDTO): Promise<Car> {
        try{
            const car = this.prisma.car.create({data})
            return car
            
        }catch(e){
            throw new AppError(e)
        }
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.prisma.car.findUnique({where: {license_plate}})

        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.prisma.car.findMany({
            where: {
                available: true,
                brand,
                category_id,
                name
            },
            include: {
                specifications_id: true
            }
        })
        
        return carsQuery;
        
    }
    
}

export { CarsRepository }
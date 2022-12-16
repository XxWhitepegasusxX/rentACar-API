import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { PrismaClient, Rentals } from "@prisma/client";
import { prisma } from "@shared/services/prismaClient";

class RentalsRepository implements IRentalsRepository{
    
    private prisma: PrismaClient

    constructor(){
        this.prisma = prisma
    }

    async update(id: string, data: any): Promise<Rentals> {
        return await this.prisma.rentals.update({
            where: {id},
            data: data,            
        })
    }

    async findById(id: string): Promise<Rentals> {
        return await this.prisma.rentals.findUnique({where: {id}})
    }

    async findOpenRentalByCar(car_id: string): Promise<Rentals> {
        return await this.prisma.rentals.findFirst({where: {
            car_id,
            end_date: null,
        }})
    }
    
    async findOpenRentalByUser(user_id: string): Promise<Rentals> {
        return await this.prisma.rentals.findFirst({where: {
            user_id,
            end_date: null,
        }});
    }

    async create({car_id, expected_return_date, user_id}: ICreateRentalDTO): Promise<Rentals> {
        return await this.prisma.rentals.create({
            data: {
                car_id,
                expected_return_date,
                user_id,
            }
        })
    }

    async findByUser(id: string): Promise<Rentals[]> {
        const rentals = await this.prisma.rentals.findMany({
            where: {user_id: id},
            include: {car: true},
        })

        return rentals
    }
    
}

export { RentalsRepository }
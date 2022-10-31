import { PrismaClient, Category } from "@prisma/client";

import { AppError } from '@shared/errors/AppError';
import { prisma } from "@shared/services/prismaClient";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";


class CategoriesRepository implements ICategoriesRepository{

    private prisma: PrismaClient 

    constructor(){
        this.prisma = prisma
    }


    async create({description, name}: ICreateCategoryDTO): Promise<void>{
        try{
            await this.prisma.category.create({
                data: {
                    name,
                    description
                }
            })
        }catch(e){
            throw new AppError(e)
        }
    
    }
    async list(): Promise<Category[]> {
        try{
            const categories = await this.prisma.category.findMany();
            return categories
        }catch(e){
            throw new AppError(e)
        }
    }
    
    async findByName(name: string): Promise<Category> {
        const category = await this.prisma.category.findUnique({
            where: {
                name
            }
        });
        return category;
    }
}

export { CategoriesRepository }
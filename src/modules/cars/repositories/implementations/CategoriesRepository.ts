import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { PrismaClient, Category } from "@prisma/client";


class CategoriesRepository implements ICategoriesRepository{

    private prisma: PrismaClient 

    constructor(){
        this.prisma = new PrismaClient()
    }


    async create({description, name}: ICreateCategoryDTO): Promise<void>{
        
        const category = this.prisma.category.create({
            data: {
                name,
                description
            }
        })
    
    }
    async list(): Promise<Category[]> {
        const categories = await this.prisma.category.findMany({
            select: {
                id: true,
                name: true,
                description: true
            }
        });
        return categories
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
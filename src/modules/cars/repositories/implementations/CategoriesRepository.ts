import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { PrismaClient, Category } from "@prisma/client";


class CategoriesRepository implements ICategoriesRepository{

    private prisma: PrismaClient 

    constructor(){
        this.prisma = new PrismaClient()
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
            console.log(e)
        }
    
    }
    async list(): Promise<Category[]> {
        try{
            const categories = await this.prisma.category.findMany();
            return categories
        }catch(e){
            console.log(e)
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
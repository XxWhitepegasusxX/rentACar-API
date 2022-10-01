import { PrismaClient, Specification } from "@prisma/client";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository{
    private prisma: PrismaClient

    constructor(){
        this.prisma = new PrismaClient()
    }

    async create({name, description}: ICreateSpecificationDTO): Promise<void>{
        try{
            await this.prisma.specification.create({
                data: {
                    name,
                    description
                }
            })
        }catch(e){
            console.log(e)
        }
    }
    async list(): Promise<Specification[]>{
        try{
            const specifications = await this.prisma.specification.findMany()
            return specifications
        }catch(e){
            console.log(e)
        }
    }
    async findByName(name: string): Promise<Specification> {
        const specification = await this.prisma.specification.findUnique({
            where: {
                name
            }
        })
        return specification;
    }
}

export { SpecificationRepository }
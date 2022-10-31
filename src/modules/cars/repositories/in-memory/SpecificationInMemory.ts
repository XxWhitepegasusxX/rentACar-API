import { Specification } from "@prisma/client";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationInMemory implements ISpecificationsRepository{
    specifications: Specification[] = []

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(specification => specification.name === name)
    }

    list(): Promise<Specification[]> {
        throw new Error("Method not implemented.");
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification: Specification = {
            name,
            description,
            id: '1234',
            created_at: new Date()
        }
        this.specifications.push(specification)
    }

    async findById(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) => ids.includes(specification.id))
    
        return allSpecifications;
    }

}

export { SpecificationInMemory }
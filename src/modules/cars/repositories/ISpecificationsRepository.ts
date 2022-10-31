import { Specification, Specification_cars } from '@prisma/client';

export interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository{
    findByName(name: string): Promise<Specification>
    list(): Promise<Specification[]>
    create({name, description}: ICreateSpecificationDTO): Promise<void>
    findById(id: string): Promise<Specification>;
}

export { ISpecificationsRepository }
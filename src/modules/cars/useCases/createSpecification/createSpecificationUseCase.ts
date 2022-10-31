import { inject, injectable } from "tsyringe";

import { AppError } from '@shared/errors/AppError';
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase{
    constructor(@inject("SpecificationsRepository") private specificationRepository: ISpecificationsRepository){}

    async execute({name, description}: IRequest): Promise<void>{
        const specificationAlreadyExist = await this.specificationRepository.findByName(name)
        if(specificationAlreadyExist){
            throw new AppError(`Specification with name ${name} already exists.`)
        }
        this.specificationRepository.create({name, description})
    }
}

export { CreateSpecificationUseCase }
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest{
    name: string;
    description: string;
}

class CreateSpecificationUseCase{
    constructor(private specificationRepository: ISpecificationsRepository){}

    async execute({name, description}: IRequest): Promise<void>{
        const specificationAlreadyExist = await this.specificationRepository.findByName(name)
        if(specificationAlreadyExist){
            throw new Error(`Specification with name ${name} already exists.`)
        }
        this.specificationRepository.create({name, description})
    }
}

export { CreateSpecificationUseCase }
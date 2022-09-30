import { Category } from "@prisma/client";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"


class ListCategoriesUseCase{
    constructor (private categoriesRepository: ICategoriesRepository){}

    execute(): Promise<Category[]>{
        const categories = this.categoriesRepository.list()

        return categories;
    }
}
export {ListCategoriesUseCase}
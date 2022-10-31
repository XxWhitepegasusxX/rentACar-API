import { Category } from "@prisma/client";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";
import { v4 as uuidV4 } from "uuid";

class CategoriesRepositoryInMemory implements ICategoriesRepository{
    
    categories: Category[] = [];
    
    async findByName(name: string): Promise<Category> {
        const category = await this.categories.find(category => category.name === name);
        return category
    }
    async list(): Promise<Category[]> {
        const list = this.categories;
        return list;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category: Category = {
            name,
            description,
            id: uuidV4(),
            created_at: new Date(),
        };

        this.categories.push(category);
    }
    
}

export { CategoriesRepositoryInMemory }
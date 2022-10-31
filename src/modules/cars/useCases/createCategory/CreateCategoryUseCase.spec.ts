import { AppError } from '@shared/errors/AppError';
import { CreateCategoryUseCase } from "./createCategoryUseCase";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("Should be able to create a new category ", async () => {

        const category = {
            name: 'Test',
            description: 'This is a test',    
        }

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)
        
        expect(categoryCreated).toHaveProperty("id")
    })

    it("Should not to be able to create a existing category ", async () => {
        
        expect( async () => {
            const category = {
                name: 'Test',
                description: 'This is a test',    
            }
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })
    
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            })

        }).rejects.toBeInstanceOf(AppError)
    })
})
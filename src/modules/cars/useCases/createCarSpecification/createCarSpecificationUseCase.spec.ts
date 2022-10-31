import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase"

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory)
    })

    it("should not be able to add a new specification to a not existent car", async () => {
        expect(async () => {
            const car_id = "1234"
            const specification_id = ["54321"]
            await createCarSpecificationUseCase.execute({car_id, specification_id})
            
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to add a new Car Specification", async () => {
        
        const car = await carsRepositoryInMemory.create({
            name: "Uno",
            description: "Carro bosta",
            brand: "Fiat",
            daily_rate: 100,
            license_plate: "RPM5000",
            fine_amount: 25.00,
            category_id: "category"
        })

        const specification_id = ["54321"]
        await createCarSpecificationUseCase.execute({car_id: car.id, specification_id})
    })
})
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    })

    it("Should be able to create a car", async () => {
        await createCarUseCase.execute({
            name: "Uno",
            description: "Carro bosta",
            brand: "Fiat",
            daily_rate: 100,
            license_plate: "RPM5000",
            fine_amount: 25.00,
            category_id: "category"
        });
    })

    it("should not be able to create a car with an existent license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Uno",
                description: "Carro bosta",
                brand: "Fiat",
                daily_rate: 100,
                license_plate: "RPM5000",
                fine_amount: 25.00,
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Uno",
                description: "Carro bosta",
                brand: "Fiat",
                daily_rate: 100,
                license_plate: "RPM5000",
                fine_amount: 25.00,
                category_id: "category"
            });  
        }).rejects.toBeInstanceOf(AppError)
    })

    it("Should be able to create a car with available true by default",async () => {
        const car = await createCarUseCase.execute({
            name: "Uno",
            description: "Carro bosta",
            brand: "Fiat",
            daily_rate: 100,
            license_plate: "RPM5000",
            fine_amount: 25.00,
            category_id: "category"
        });

        expect(car.available).toBe(true)
    })
})
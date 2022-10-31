import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarRepositoryInMemory';
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            
            name: "Car1",
            description: "Car description",
            brand: "Brand",
            daily_rate: 100,
            license_plate: "LTV-1001",
            fine_amount: 25.00,
            category_id: "856d7cfb-a40d-4aa9-b052-0b29b5687fc2"
            
        });

        const cars = await listAvailableCarsUseCase.execute({})
        

        expect(cars).toEqual([car])
    })
    it("should be able to list all available cars by name || brand || category_id", async () => {

        const car = await carsRepositoryInMemory.create({
            
            name: "Car2",
            description: "Car description",
            brand: "BrandTest",
            daily_rate: 100,
            license_plate: "LTV-1001",
            fine_amount: 25.00,
            category_id: "856d7cfb-a40d-4aa9-b052-0b29b5687fc2"
            
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "BrandTest"
        })

        expect(cars).toEqual([car])
    })
})
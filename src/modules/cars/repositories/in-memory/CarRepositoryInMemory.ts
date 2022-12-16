import { Car } from '@prisma/client';

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "../ICarsRepository";
import { v4 } from 'uuid';

class CarsRepositoryInMemory implements ICarsRepository{
    
    async updateAvailable(id: string, available: boolean): Promise<void> {
        throw new Error('Method not implemented.');
        
    }
    
    async addSpecification(car_id: string, specification_id: string): Promise<Car> {
        throw new Error('Method not implemented.');
    }
    
    cars: Car[] = []
    
    async create(data: ICreateCarDTO): Promise<Car> {
        const car: Car = {
            ...data,
            id: v4(),
            available: true,
            created_at: new Date()
            
        }
        
        this.cars.push(car)
        return car
    }
    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate)
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const all = this.cars.filter((car) => {
            if(car.available === true ||
            (brand && car.brand === brand) || 
            (category_id && car.category_id === category_id) ||
            (name && car.name === name)
            ){
                return car
            }
            return null
        });
        return all;
    }

    async findById(id: string): Promise<Car>{
        const car = this.cars.find(car => car.id === id)
        
        return car;
    }
}
export { CarsRepositoryInMemory}
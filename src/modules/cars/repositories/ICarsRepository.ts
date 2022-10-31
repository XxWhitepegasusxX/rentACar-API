import { Car } from "@prisma/client";
import { ICreateCarDTO } from "../dtos/ICreateCarDTO"

interface ICarsRepository{
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]>;
    findById(id: string): Promise<Car>;
    addSpecification(car_id: string, specification_id: string): Promise<Car>;
}
export { ICarsRepository }
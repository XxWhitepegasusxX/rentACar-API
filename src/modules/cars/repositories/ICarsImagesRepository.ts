import { Car_images } from "@prisma/client"

interface ICarsImagesRepository{

    create(car_id: string, image_name: string): Promise<Car_images>

}

export { ICarsImagesRepository }
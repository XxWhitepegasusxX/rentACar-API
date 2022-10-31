-- CreateTable
CREATE TABLE "Car_images" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Car_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car_images" ADD CONSTRAINT "Car_images_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE SET NULL ON UPDATE CASCADE;

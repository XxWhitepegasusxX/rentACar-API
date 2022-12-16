-- DropForeignKey
ALTER TABLE "Car_images" DROP CONSTRAINT "Car_images_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_category_id_fkey";

-- DropForeignKey
ALTER TABLE "Rentals" DROP CONSTRAINT "Rentals_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Rentals" DROP CONSTRAINT "Rentals_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Specification_cars" DROP CONSTRAINT "Specification_cars_car_id_fkey";

-- DropForeignKey
ALTER TABLE "Specification_cars" DROP CONSTRAINT "Specification_cars_specification_id_fkey";

-- CreateTable
CREATE TABLE "User_token" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User_token" ADD CONSTRAINT "User_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specification_cars" ADD CONSTRAINT "Specification_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Specification_cars" ADD CONSTRAINT "Specification_cars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "Specification"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car_images" ADD CONSTRAINT "Car_images_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "Cars"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rentals" ADD CONSTRAINT "Rentals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

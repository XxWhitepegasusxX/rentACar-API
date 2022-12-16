import { container } from "tsyringe";

import "@shared/container/providers"

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/prismaorm/repositories/CategoriesRepository'

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationRepository } from "@modules/cars/infra/prismaorm/repositories/SpecificationsRepository";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/prismaorm/repositories/UsersRepository";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/prismaorm/repositories/CarsRepository";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from '@modules/cars/infra/prismaorm/repositories/CarsImagesRepository';

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { RentalsRepository } from "@modules/rentals/infra/prismaORM/repositories/RentalsRepository";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/prismaorm/repositories/UsersTokensRepository";

// ICategoryRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationRepository
)

// IUsersRepository
container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

// ICarsRepository"
container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

// ICarsImagesRepository
container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)

//RentalsRepository
container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

// IUsersTokensRepository
container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)
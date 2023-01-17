import {container} from "tsyringe";
import { UsersRepository } from "@modules/account/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICategoriesRepository } from "@modules/car/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/car/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/car/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationsRepository } from "@modules/car/repositories/ISpecificationsRepository";
import { ICarsRepository } from "@modules/car/repositories/ICarsRepository";
import { CarsRepository } from "@modules/car/infra/typeorm/repositories/CarsRepository";
import { ICarImagesRepository } from "@modules/car/repositories/ICarImagesRepository";
import { CarImagesRepository } from "@modules/car/infra/typeorm/repositories/CarImagesRepository";
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository", SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UsersRepository", UsersRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository", CarsRepository
);

container.registerSingleton<ICarImagesRepository>(
    "CarImagesRepository", CarImagesRepository
);
import { Router } from 'express';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/ListRentalsByUser/ListRentalsByUserController';

const rentalRoutes = Router();

const devolutionRentalController = new DevolutionRentalController()
const createRentalController = new CreateRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle)
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle)
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle)

export { rentalRoutes }
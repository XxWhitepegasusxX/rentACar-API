import { Router } from 'express'

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/createSpecificationController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticated, ensureAdmin)

specificationsRoutes.post('/', createSpecificationController.handle)

export { specificationsRoutes }

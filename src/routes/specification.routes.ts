import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecificationController'
import { Router } from 'express'

const specificationsRouter = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRouter.post('/', createSpecificationController.handle)

export { specificationsRouter }

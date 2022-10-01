import createSpecificationController from '../modules/cars/useCases/createSpecification'
import { Router } from 'express'

const specificationsRouter = Router()

specificationsRouter.post('/',(req, res) => {
    return createSpecificationController().handle(req, res)
})

export { specificationsRouter }
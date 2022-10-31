import { Router } from 'express'
import multer from 'multer'
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController'
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/importCategoryController'
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'
import { ensureAdmin } from '../middlewares/ensureAdmin'

const categoriesRoutes = Router()

const upload = multer({
    dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle)

categoriesRoutes.post("/import", ensureAuthenticated, ensureAdmin, upload.single("file"), importCategoryController.handle)

export { categoriesRoutes }
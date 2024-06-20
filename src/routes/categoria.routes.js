import { categoriaControllers } from '../controllers/index.controllers.js'
import { Router } from 'express'

const categoriaRouter = Router()

categoriaRouter.get('/', categoriaControllers.listarCategorias)

export default categoriaRouter

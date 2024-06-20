import { productoControllers } from '../controllers/index.controllers.js'
import { Router } from 'express'

const productoRouter = Router()

productoRouter.get('/', productoControllers.listarProductos)

export default productoRouter

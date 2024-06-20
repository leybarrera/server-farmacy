import { ventaControllers } from '../controllers/index.controllers.js'
import { Router } from 'express'

const ventaRouter = Router()

ventaRouter.get('/', ventaControllers.listarVentas)

export default ventaRouter

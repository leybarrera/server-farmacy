import { Router } from 'express'
import categoriaRouter from './categoria.routes.js'
import productoRouter from './producto.routes.js'
import usuarioRouter from './usuario.route.js'
import ventaRouter from './venta.routes.js'

const rootRouter = Router()

rootRouter.use('/categorias', categoriaRouter)
rootRouter.use('/productos', productoRouter)
rootRouter.use('/usuarios', usuarioRouter)
rootRouter.use('/ventas', ventaRouter)

export default rootRouter

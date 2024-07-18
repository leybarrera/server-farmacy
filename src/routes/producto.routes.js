import { productoControllers } from '../controllers/index.controllers.js';
import { Router } from 'express';

const productoRouter = Router();

productoRouter.get('/', productoControllers.listarProductos);
productoRouter.get('/category/:id', productoControllers.listarPorCategoria);
productoRouter.post('/', productoControllers.crearProducto);
productoRouter.delete('/delete/:id', productoControllers.borrarProducto);

export default productoRouter;

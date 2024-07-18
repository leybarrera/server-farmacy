import { ventaControllers } from '../controllers/index.controllers.js';
import { Router } from 'express';

const ventaRouter = Router();

ventaRouter.get('/', ventaControllers.listarVentas);
ventaRouter.get('/venta/:id', ventaControllers.listarPorUsuario);
ventaRouter.post('/', ventaControllers.crearVenta);

ventaRouter.delete('/delete/:id', ventaControllers.borrarVenta);

ventaRouter.post('/voucher', ventaControllers.setVoucher);

ventaRouter.post('/voucher/aceptado/:id', ventaControllers.setVoucherAceptado);
ventaRouter.post(
  '/voucher/rechazado/:id',
  ventaControllers.setVoucherRechazado
);

export default ventaRouter;

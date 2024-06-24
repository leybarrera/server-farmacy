import { ventaControllers } from "../controllers/index.controllers.js";
import { Router } from "express";

const ventaRouter = Router();

ventaRouter.get("/", ventaControllers.listarVentas);
ventaRouter.post("/", ventaControllers.crearVenta);
ventaRouter.delete("/delete/:id", ventaControllers.borrarVenta);

ventaRouter.post("/confirm", ventaControllers.saleProducts);

export default ventaRouter;

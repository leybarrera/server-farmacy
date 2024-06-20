import { productoControllers } from "../controllers/index.controllers.js";
import { Router } from "express";

const productoRouter = Router();

productoRouter.get("/", productoControllers.listarProductos);
productoRouter.post("/", productoControllers.crearProducto);

export default productoRouter;

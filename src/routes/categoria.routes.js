import { categoriaControllers } from "../controllers/index.controllers.js";
import { Router } from "express";

const categoriaRouter = Router();

categoriaRouter.get("/", categoriaControllers.listarCategorias);
categoriaRouter.post("/", categoriaControllers.crearCategoria);
categoriaRouter.delete("/delete/:id", categoriaControllers.borrarCategoria);

export default categoriaRouter;

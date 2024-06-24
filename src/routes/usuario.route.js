import { usuarioControllers } from "../controllers/index.controllers.js";
import { Router } from "express";

const usuarioRouter = Router();

usuarioRouter.get("/", usuarioControllers.listarUsuarios);
usuarioRouter.post("/", usuarioControllers.registrarUsuario);
usuarioRouter.post("/login", usuarioControllers.login);
usuarioRouter.delete("/delete/:id", usuarioControllers.borrarUsuario);

export default usuarioRouter;

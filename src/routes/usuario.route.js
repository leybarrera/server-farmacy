import { usuarioControllers } from '../controllers/index.controllers.js'
import { Router } from 'express'

const usuarioRouter = Router()

usuarioRouter.post('/', usuarioControllers.registrarUsuario)
usuarioRouter.post('/login', usuarioControllers.login)

export default usuarioRouter

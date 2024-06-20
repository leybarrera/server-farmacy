import { Sequelize } from 'sequelize'
import { DATABASE_CONFIG } from '../config/config.js'
import {
  CategoriaModel,
  ProductoModel,
  UsuarioModel,
  VentaModel,
} from '../models/index.js'

const conn = new Sequelize(DATABASE_CONFIG.URI, DATABASE_CONFIG.CONFIG)

CategoriaModel(conn)
ProductoModel(conn)
UsuarioModel(conn)
VentaModel(conn)

const { Categoria, Producto, Usuario, Venta } = conn.models

Categoria.hasMany(Producto)
Producto.belongsTo(Categoria)

Producto.hasMany(Venta)
Venta.belongsTo(Producto)

Usuario.hasMany(Venta)
Venta.belongsTo(Usuario)

export { conn, Categoria, Producto, Venta, Usuario }

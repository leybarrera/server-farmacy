import { Sequelize } from 'sequelize';
import { DATABASE_CONFIG } from '../config/config.js';
import {
  CategoriaModel,
  DetalleVentaModel,
  ProductoModel,
  UsuarioModel,
  VentaModel,
} from '../models/index.js';

const conn = new Sequelize(DATABASE_CONFIG.URI, DATABASE_CONFIG.CONFIG);

CategoriaModel(conn);
ProductoModel(conn);
UsuarioModel(conn);
VentaModel(conn);
DetalleVentaModel(conn);

const { Categoria, Producto, Usuario, Venta, DetalleVenta } = conn.models;

Categoria.hasMany(Producto);
Producto.belongsTo(Categoria);

Producto.hasMany(Venta);
Venta.belongsTo(Producto);

Usuario.hasMany(Venta);
Venta.belongsTo(Usuario);

Venta.hasMany(DetalleVenta);
DetalleVenta.belongsTo(Venta);

export { conn, Categoria, Producto, Venta, Usuario, DetalleVenta };

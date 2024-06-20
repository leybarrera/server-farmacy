import { Op } from "sequelize";
import { Producto } from "../lib/connection.js";

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, imagen, CategoryId } = req.body;
    if (!nombre || !precio || !imagen || !CategoryId)
      return res.status(400).json({
        message: "Datos del producto incompleto",
      });

    const [producto, created] = await Producto.findOrCreate({
      where: {
        nombre: {
          [Op.iLike]: `%${nombre}%`,
        },
      },
      defaults: { nombre, precio, imagen, CategoryId },
    });

    return created
      ? res.status(201).json({
          message: "Producto creado con éxito",
        })
      : res.status(400).json({
          message: "Este producto ya existe",
        });
  } catch (error) {
    return req.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({});
    return res.status(200).json({ productos });
  } catch (error) {
    return req.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export default { listarProductos, crearProducto };

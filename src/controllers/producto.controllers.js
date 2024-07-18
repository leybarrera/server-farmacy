import { Op } from 'sequelize';
import { Producto } from '../lib/connection.js';
import cloudinaryHelper from '../helpers/cloudinary/cloudinary.helper.js';

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, imagen, CategoryId } = req.body;
    if (!nombre || !precio || !imagen || !CategoryId)
      return res.status(400).json({
        message: 'Datos del producto incompleto',
      });

    const url_image = await cloudinaryHelper.uploadImage('products', imagen);

    const [producto, created] = await Producto.findOrCreate({
      where: {
        nombre: {
          [Op.iLike]: `%${nombre}%`,
        },
      },
      defaults: { nombre, precio, imagen: url_image, CategoryId },
    });

    return created
      ? res.status(201).json({
          message: 'Producto creado con éxito',
        })
      : res.status(400).json({
          message: 'Este producto ya existe',
        });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({});
    return res.status(200).json({ productos });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const listarPorCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const productos = await Producto.findAll({
      where: {
        CategoryId: id,
      },
    });
    return res.status(200).json({ productos });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const borrarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProductos = await Producto.destroy({
      where: { id },
    });
    return deleteProductos > 0
      ? res.status(201).json({
          message: 'Producto elimiando',
        })
      : res.status(400).json({
          message: 'No se pudo eliminar al producto',
        });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

export default {
  listarProductos,
  crearProducto,
  borrarProducto,
  listarPorCategoria,
};

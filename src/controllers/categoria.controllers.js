import { Op } from "sequelize";
import { Categoria } from "../lib/connection.js";

const crearCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [_, created] = await Categoria.findOrCreate({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`,
        },
      },
      defaults: { nombre },
    });
    return created
      ? req.status(200).json({
          message: "Categoría creada con éxito",
        })
      : res.status(400).json({
          message: "Esta categoría ya existe",
        });
  } catch (error) {
    return req.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({});
    return res.status(200).json({ categorias });
  } catch (error) {
    return req.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export default { listarCategorias, crearCategoria };

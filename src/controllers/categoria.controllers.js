import { Op } from "sequelize";
import { Categoria } from "../lib/connection.js";

const crearCategoria = async (req, res) => {
  try {
    const { nombre, imagen } = req.body;
    const [_, created] = await Categoria.findOrCreate({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`,
        },
      },
      defaults: { nombre, imagen },
    });
    return created
      ? res.status(200).json({
          message: "Categoría creada con éxito",
        })
      : res.status(400).json({
          message: "Esta categoría ya existe",
        });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({});
    return res.status(200).json({ categorias });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
const borrarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoriasDeleted = await Categoria.destroy({
      where: {
        id,
      },
    });
    return categoriasDeleted > 0
      ? res.status(200).json({
          message: "Categoría eliminada",
        })
      : res.status(400).json({
          message: "No se pudo eliminar la categoria",
        });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export default { listarCategorias, crearCategoria, borrarCategoria };

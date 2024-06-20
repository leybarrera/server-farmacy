import { Categoria } from '../lib/connection.js'

const listarCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({})
    return res.status(200).json({ categorias })
  } catch (error) {
    return req.status(500).json({
      message: 'Error interno en el servidor',
    })
  }
}

export default { listarCategorias }

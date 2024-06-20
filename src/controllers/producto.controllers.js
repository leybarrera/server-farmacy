import { Producto } from '../lib/connection.js'

const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({})
    return res.status(200).json({ productos })
  } catch (error) {
    return req.status(500).json({
      message: 'Error interno en el servidor',
    })
  }
}

export default { listarProductos }

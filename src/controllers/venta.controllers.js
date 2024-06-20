import { Venta } from '../lib/connection.js'

const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({})
    return res.status(200).json({ ventas })
  } catch (error) {
    return req.status(500).json({
      message: 'Error interno en el servidor',
    })
  }
}

export default { listarVentas }

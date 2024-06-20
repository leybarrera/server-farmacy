import { Venta } from "../lib/connection.js";

const crearVenta = async (req, res) => {
  try {
    const { cantidad, cedula, ProductId } = req.body;
    if (!cantidad || !cedula || !ProductId)
      return res.status(400).json({
        message: "Los dato son obligatorios",
      });

    const venta = await Venta.create({ cantidad, cedula, ProductId });
    return venta
      ? res.status(201).json({
          message: "Venta creada con éxito",
        })
      : res.status(400).json({
          message: "Error al crear la venta. Intente de nuevo.",
        });
  } catch (error) {
    return req.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({});
    return res.status(200).json({ ventas });
  } catch (error) {
    return req.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export default { listarVentas, crearVenta };

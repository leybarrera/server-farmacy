import nodemailer from "../helpers/nodemailer/index.js";
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
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({});
    return res.status(200).json({ ventas });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const borrarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVentas = await Venta.destroy({
      where: { id },
    });
    return deleteVentas > 0
      ? res.status(201).json({
          message: "Venta eliminada",
        })
      : res.status(400).json({
          message: "No se pudo eliminar la vent",
        });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const saleProducts = async (req, res) => {
  try {
    const { to, name, cart } = req.body;
    nodemailer.saleNotification(to, name, cart);
    return res.status(200).json({
      message: "Compra realizada con éxito",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

export default { listarVentas, crearVenta, borrarVenta, saleProducts };

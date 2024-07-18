import nodemailer from '../helpers/nodemailer/index.js';
import { DetalleVenta, Usuario, Venta } from '../lib/connection.js';
import helperCloudinary from '../helpers/cloudinary/cloudinary.helper.js';

const crearVenta = async (req, res) => {
  console.log(req.body);
  try {
    // productsDetalle = [producto,precioUnitario,cantidad,subTotal,VentaId]
    const { UsuarioId, products } = req.body;
    if (!UsuarioId)
      return res.status(400).json({
        message: 'Los datos son obligatorios',
      });
    const usuario = await Usuario.findByPk(UsuarioId);
    const monto = products.reduce((acc, prev) => {
      return (acc += prev.precio * prev.cantidad);
    }, 0);
    const venta = await Venta.create({ monto, UsuarioId });
    if (venta) {
      for (let product of products) {
        await DetalleVenta.create({
          cantidad: product.cantidad,
          producto: product.nombre,
          precioUnitario: product.precio,
          subTotal: Number(product.precio) * Number(product.cantidad),
          VentaId: venta.id,
        });
      }
      nodemailer.saleNotification(
        usuario.email,
        usuario.nombre + ' ' + usuario.apellido,
        products
      );
      return res.status(201).json({
        message: 'Venta creada con éxito',
      });
    }
    return res.status(400).json({
      message: 'Error al crear la venta. Intente de nuevo.',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({});
    return res.status(200).json({ ventas });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const listarPorUsuario = async (req, res) => {
  try {
    const { id: UsuarioId } = req.params;
    const ventas = await Venta.findAll({
      UsuarioId,
    });
    return res.status(200).json({ ventas });
  } catch (error) {}
};

const borrarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteVentas = await Venta.destroy({
      where: { id },
    });
    return deleteVentas > 0
      ? res.status(201).json({
          message: 'Venta eliminada',
        })
      : res.status(400).json({
          message: 'No se pudo eliminar la vent',
        });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const setVoucher = async (req, res) => {
  try {
    const { id, image } = req.body;
    const url_image = await helperCloudinary.uploadImage('farmacy', image);
    const venta = await Venta.findOne({
      where: {
        id,
      },
    });
    venta.voucher = url_image;
    venta.status = 'Procesando';
    await venta.save();
    const usuario = await Usuario.findByPk(venta.UsuarioId);
    nodemailer.voucherRecibido(
      usuario.email,
      usuario.nombre + ' ' + usuario.apellido,
      url_image
    );
    return venta
      ? res.status(200).json({
          message: 'Comprobante subido con éxito',
        })
      : res.status(400).json({
          message: 'Error al guardar el comprobante',
        });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const setVoucherAceptado = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findOne({
      where: {
        id,
      },
    });
    const usuario = await Usuario.findByPk(venta.UsuarioId);
    nodemailer.voucherAceptado(
      usuario.email,
      usuario.nombre + ' ' + usuario.apellido,
      venta.voucher
    );
    venta.status = 'Pagado';
    await venta.save();
    return res.status(200).json({
      message: 'Comprobante aceptado con éxito',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Erro interno en el servidor',
    });
  }
};
const setVoucherRechazado = async (req, res) => {
  try {
    const { id } = req.params;
    const venta = await Venta.findOne({
      where: {
        id,
      },
    });
    const usuario = await Usuario.findByPk(venta.UsuarioId);
    venta.status = 'Rechazado';
    await venta.save();

    nodemailer.voucherRechazado(
      usuario.email,
      usuario.nombre + ' ' + usuario.apellido,
      venta.voucher
    );
    return res.status(200).json({
      message: 'Comprobante rechazado con éxito',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erro interno en el servidor',
    });
  }
};

export default {
  listarVentas,
  crearVenta,
  borrarVenta,
  listarPorUsuario,
  setVoucher,
  setVoucherAceptado,
  setVoucherRechazado,
};

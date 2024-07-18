import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { NODEMAILER_CONFIG } from '../../config/config.js';

const generatePathName = (fileName) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathname = path.join(__dirname, `../../html/${fileName}.html`);
  return pathname;
};

const send = (to, file, subject) => {
  const transporter = nodemailer.createTransport(NODEMAILER_CONFIG);
  transporter.sendMail({
    from: 'nyellove1998@gmail.com',
    to,
    subject,
    html: file,
  });
};

const saleNotification = (to, name, products) => {
  const pathname = generatePathName('sale');
  let productsHtml = '';
  let total = 0;
  products.forEach((product) => {
    const subtotal = (product.precio * product.cantidad).toFixed(2);
    productsHtml += `<tr>
          <td>${product.nombre}</td>
          <td>$ ${product.precio.toFixed(2)}</td>
          <td>${product.cantidad}</td>  
          <td>$ ${subtotal}</td> 
        </tr>`;

    total += Number(subtotal);
  });

  const file = fs
    .readFileSync(pathname, { encoding: 'utf-8' })
    .toString()
    .replace('${name}', name)
    .replace('${products}', productsHtml)
    .replace('${total}', total.toFixed(2));
  send(to, file, 'Compra realizada con éxito');
};

const voucherRecibido = (to, cliente, voucher) => {
  const pathname = generatePathName('voucher_recibido');
  const file = fs
    .readFileSync(pathname, { encoding: 'utf-8' })
    .toString()
    .replace('${NOMBRE_CLIENTE}', cliente)
    .replace('${URL_VOUCHER}', voucher);

  send(to, file, 'Comprobante recibido con éxito');
};

const voucherAceptado = (to, cliente, voucher) => {
  const pathname = generatePathName('pago_confirmado');
  const file = fs
    .readFileSync(pathname, { encoding: 'utf-8' })
    .toString()
    .replace('${NOMBRE_CLIENTE}', cliente)
    .replace('${URL_VOUCHER}', voucher);

  send(to, file, 'Comprobante confirmado');
};
const voucherRechazado = (to, cliente, voucher) => {
  const pathname = generatePathName('pago_rechazado');
  const file = fs
    .readFileSync(pathname, { encoding: 'utf-8' })
    .toString()
    .replace('${NOMBRE_CLIENTE}', cliente)
    .replace('${URL_VOUCHER}', voucher);

  send(to, file, 'Comprobante rechazado');
};

const recuperarContraseña = (to, cliente, codigo) => {
  const pathname = generatePathName('recuperar_contraseña');
  const file = fs
    .readFileSync(pathname, { encoding: 'utf-8' })
    .toString()
    .replace('${NOMBRE_CLIENTE}', cliente)
    .replace('${RECOVERY_CODE}', codigo);

  send(to, file, 'Recuperación de contraseña');
};

export default {
  saleNotification,
  voucherRecibido,
  voucherAceptado,
  voucherRechazado,
  recuperarContraseña,
};

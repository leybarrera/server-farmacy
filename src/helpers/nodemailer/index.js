import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import { NODEMAILER_CONFIG } from "../../config/config.js";

const generatePathName = (fileName) => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathname = path.join(__dirname, `../../html/${fileName}.html`);
  return pathname;
};

const send = (to, file, subject) => {
  const transporter = nodemailer.createTransport(NODEMAILER_CONFIG);
  transporter.sendMail({
    from: "nyellove1998@gmail.com",
    to,
    subject,
    html: file,
  });
};

const saleNotification = (to, name, products) => {
  const pathname = generatePathName("sale");
  let productsHtml = "";
  let total = 0;
  products.forEach((product) => {
    const subtotal = (product.price * product.cantidad).toFixed(2);
    productsHtml += `<tr>
          <td>${product.name}</td>
          <td>$ ${product.price.toFixed(2)}</td>
          <td>${product.cantidad}</td>  
          <td>$ ${subtotal}</td> 
        </tr>`;

    total += Number(subtotal);
  });

  const file = fs
    .readFileSync(pathname, { encoding: "utf-8" })
    .toString()
    .replace("${name}", name)
    .replace("${products}", productsHtml)
    .replace("${total}", total.toFixed(2));
  send(to, file, "Compra realizada con éxito");
};

export default { saleNotification };

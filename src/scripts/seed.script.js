import { ADMIN_SECRET_PASSWORD } from "../config/config.js";
import bcryptHelper from "../helpers/bcrypt/bcrypt.helper.js";
import { Usuario } from "../lib/connection.js";

export const loadUserAdmin = async () => {
  try {
    const users = await Usuario.findAll({});
    if (users.length === 0) {
      const passwordHashed = await bcryptHelper.hashPassword(
        ADMIN_SECRET_PASSWORD
      );
      await Usuario.create({
        nombre: "Leyn",
        apellido: "Barrera",
        sexo: "male",
        rol: "admin",
        email: "nyellove1998@gmail.com",
        contraseña: passwordHashed,
        cedula: "0952577393",
        fecha_nacimiento: "05/11/1998",
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al guardar usuario");
  }
};

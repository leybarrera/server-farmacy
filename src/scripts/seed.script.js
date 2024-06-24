import { Usuario } from "../lib/connection.js";

export const loadUserAdmin = async () => {
  try {
    const users = await Usuario.findAll({});
    if (users.length === 0) {
      await Usuario.create({
        nombre: "Leyn",
        apellido: "Barrera",
        sexo: "male",
        rol: "admin",
        email: "nyellove1998@gmail.com",
        contraseña: "a12b32*",
        cedula: "0940501596",
        fecha_nacimiento: "09-05-1996",
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error al guardar usuario");
  }
};

import { Op } from "sequelize";
import { Usuario } from "../lib/connection.js";
import bcryptHelper from "../helpers/bcrypt/bcrypt.helper.js";
import { format } from "date-fns";
const registrarUsuario = async (req, res) => {
  try {
    const {
      cedula,
      nombre,
      apellido,
      email,
      contraseña,
      fecha_nacimiento,
      sexo,
    } = req.body;

    if (!nombre || !email || !contraseña)
      return res.status(400).json({
        message: "Todos los datos son obligatorios",
      });
    const passwordHashed = await bcryptHelper.hashPassword(contraseña);

    const [usuario, created] = await Usuario.findOrCreate({
      where: {
        [Op.or]: {
          email,
        },
      },
      defaults: {
        ...req.body,
        fecha_nacimiento: format(fecha_nacimiento, "dd/MM/yyyy"),
        contraseña: passwordHashed,
      },
    });
    return created
      ? res.status(200).json({
          message: "Usuario registrado con éxito",
        })
      : res.status(400).json({
          message: "Ya existe un usuario con este email o cédula",
        });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    if (!email || !contraseña)
      return res.status(400).json({
        message: "El usuario y contraseña es obligatorio",
      });

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });
    if (!usuario)
      return res.status(401).json({
        message: "Usuario no registrado",
      });

    const isValidPassword = await bcryptHelper.comparePassword(
      contraseña,
      usuario.contraseña
    );
    if (!isValidPassword)
      return res.status(401).json({
        message: "Credenciales incorrectas",
      });

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        fecha_nacimiento: usuario.fecha_nacimiento,
        sexo: usuario.sexo,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el sevidor",
    });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: {
        isDeleted: false,
      },
    });
    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};
const listaTodosUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: {
        isDeleted: true,
      },
    });
    return res.status(200).json({ usuarios });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

// Método para eliminar usuarios, se aplicará borrado lógico
const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (!usuario)
      return res.status(400).json({
        message: "Este usuario ya ha sido eliminado",
      });

    usuario.isDeleted = true;
    await usuario.save();
    return res.status(200).json({
      message: "Usuario eliminado con éxito",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno en el servidor",
    });
  }
};

// Método para recuperar usuarios eliminados
const recuperarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });
    if (!usuario)
      return res.status(400).json({
        message: "Usuario no válido",
      });

    usuario.isDeleted = false;
    await usuario.save();
    return res.status(200).json({
      message: "Usuario recuperado con éxito",
    });
  } catch (error) {}
};

export default {
  registrarUsuario,
  login,
  listarUsuarios,
  borrarUsuario,
  listaTodosUsuarios,
  recuperarUsuario,
};

import { Op } from 'sequelize';
import { Usuario } from '../lib/connection.js';
import bcryptHelper from '../helpers/bcrypt/bcrypt.helper.js';
import { format } from 'date-fns';
import randomString from 'random-string';
import nodemailer from '../helpers/nodemailer/index.js';
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

    if (
      !nombre ||
      !email ||
      !contraseña ||
      !cedula ||
      !apellido ||
      !sexo ||
      !fecha_nacimiento
    )
      return res.status(400).json({
        message: 'Todos los datos son obligatorios',
      });
    const passwordHashed = await bcryptHelper.hashPassword(contraseña);
    const usuarioExist = await Usuario.findOne({
      where: {
        [Op.or]: [{ email }, { cedula }],
      },
    });
    if (usuarioExist)
      return res.status(400).json({
        message: 'Error al registrar. Datos duplicados.',
      });
    const birthDate = format(fecha_nacimiento, 'dd/MM/yyyy');
    const usuario = await Usuario.create({
      nombre,
      apellido,
      email,
      contraseña: passwordHashed,
      fecha_nacimiento: birthDate,
      cedula,
      sexo,
    });
    return usuario
      ? res.status(201).json({ message: 'Registro completado con éxito' })
      : res
          .status(400)
          .json({ message: 'Usuario no registrado. Intente de nuevo.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    if (!email || !contraseña)
      return res.status(400).json({
        message: 'El usuario y contraseña es obligatorio',
      });

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });
    if (!usuario)
      return res.status(401).json({
        message: 'Usuario no registrado',
      });

    const isValidPassword = await bcryptHelper.comparePassword(
      contraseña,
      usuario.contraseña
    );
    if (!isValidPassword)
      return res.status(401).json({
        message: 'Credenciales incorrectas',
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
      message: 'Error interno en el sevidor',
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
      message: 'Error interno en el servidor',
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
      message: 'Error interno en el servidor',
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
        message: 'Este usuario ya ha sido eliminado',
      });

    usuario.isDeleted = true;
    await usuario.save();
    return res.status(200).json({
      message: 'Usuario eliminado con éxito',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
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
        message: 'Usuario no válido',
      });

    usuario.isDeleted = false;
    await usuario.save();
    return res.status(200).json({
      message: 'Usuario recuperado con éxito',
    });
  } catch (error) {}
};

const recuperarContraseña = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    });
    if (!usuario)
      return res.status(200).json({
        message:
          'Si este email esta registrado. Recibirá un correo con un código de verificación para poder continuar.',
      });

    const codigo = randomString({
      length: 6,
      letters: true,
    });
    usuario.recoveryPasswordCode = codigo;
    await usuario.save();
    nodemailer.recuperarContraseña(
      email,
      usuario.nombre + ' ' + usuario.apellido,
      codigo
    );

    return res.status(200).json({
      message:
        'Si este email esta registrado. Recibirá un correo con un código de verificación para poder continuar',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

const verificarCodigo = async (req, res) => {
  try {
    const { codigo, email } = req.body;
    const usuario = await Usuario.findOne({
      where: {
        email,
        recoveryPasswordCode: codigo,
      },
    });
    return usuario
      ? res.status(200).json({
          message: 'Código verificado con éxito. Ingrese la nueva contraseña.',
        })
      : res.status(400).json({
          message:
            'Código y/o email inválido. Intente de nuevo o contacte con un administrador.',
        });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};
const cambiarContraseña = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const hashPassword = await bcryptHelper.hashPassword(contraseña);
    const [updated] = await Usuario.update(
      {
        contraseña: hashPassword,
        recoveryPasswordCode: null,
      },
      {
        where: {
          email,
        },
      }
    );
    return updated
      ? res.status(200).json({
          message: 'Contraseña actualizada con éxito. Inicia sesión.',
        })
      : res.status(400).json({
          message:
            'Error. No se pudo actualizar la contraseña. Intente otra vez.',
        });
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    });
  }
};

export default {
  registrarUsuario,
  login,
  listarUsuarios,
  borrarUsuario,
  listaTodosUsuarios,
  recuperarUsuario,
  recuperarContraseña,
  verificarCodigo,
  cambiarContraseña,
};

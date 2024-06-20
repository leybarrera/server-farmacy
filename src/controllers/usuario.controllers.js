import { Op } from 'sequelize'
import { Usuario } from '../lib/connection.js'

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
    } = req.body

    if (
      !cedula ||
      !nombre ||
      !apellido ||
      !email ||
      !contraseña ||
      !fecha_nacimiento ||
      !sexo
    )
      return res.status(400).json({
        message: 'Todos los datos son obligatorios',
      })

    const [usuario, created] = await Usuario.findOrCreate({
      where: {
        [Op.or]: {
          cedula,
          email,
        },
      },
      defaults: {
        cedula,
        nombre,
        apellido,
        email,
        contraseña,
        fecha_nacimiento,
        sexo,
      },
    })
    return created
      ? res.status(200).json({
          message: 'Usuario registrado con éxito',
        })
      : res.status(400).json({
          message: 'Ya existe un usuario con este email o cédula',
        })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el servidor',
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body
    if (!email || !contraseña)
      return res.status(400).json({
        message: 'El usuario y contraseña es obligatorio',
      })

    const usuario = await Usuario.findOne({
      where: {
        email,
      },
    })
    if (!usuario)
      return res.status(401).json({
        message: 'Usuario no registrado',
      })

    if (usuario.contraseña !== contraseña)
      return res.status(401).json({
        message: 'Credenciales incorrectas',
      })

    return res.status(200).json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        fecha_nacimiento: usuario.fecha_nacimiento,
        sexo: usuario.sexo,
      },
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error interno en el sevidor',
    })
  }
}

export default { registrarUsuario, login }

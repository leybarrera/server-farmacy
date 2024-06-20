import { DataTypes } from 'sequelize'

const UsuarioModel = (conn) => {
  conn.define(
    'Usuario',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sexo: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ['male', 'female', 'custom'],
      },
    },
    {
      timestamps: false,
    }
  )
}

export default UsuarioModel

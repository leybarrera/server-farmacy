import { DataTypes } from 'sequelize';

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
        unique: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
      },
      sexo: {
        type: DataTypes.ENUM,
        values: ['male', 'female', 'custom'],
        defaultValue: 'custom',
      },
      recoveryPasswordCode: {
        type: DataTypes.STRING,
      },
      rol: {
        type: DataTypes.ENUM,
        values: ['admin', 'client'],
        defaultValue: 'client',
      },

      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

export default UsuarioModel;

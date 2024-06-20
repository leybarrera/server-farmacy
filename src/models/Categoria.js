import { DataTypes } from 'sequelize'

const CategoriaModel = (conn) => {
  conn.define(
    'Categoria',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  )
}

export default CategoriaModel

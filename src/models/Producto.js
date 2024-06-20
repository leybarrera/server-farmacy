import { DataTypes } from 'sequelize'

const ProductoModel = (conn) => {
  conn.define(
    'Producto',
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
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 1.0,
        },
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      CategoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Categoria',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    }
  )
}

export default ProductoModel

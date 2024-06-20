import { DataTypes } from 'sequelize'

const VentaModel = (conn) => {
  conn.define(
    'Venta',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      cantidad: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cedula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    }
  )
}

export default VentaModel

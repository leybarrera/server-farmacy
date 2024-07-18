import { DataTypes } from 'sequelize';

const DetalleVentaModel = (sequelize) => {
  sequelize.define(
    'DetalleVenta',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      producto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      VentaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Venta',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
    }
  );
};

export default DetalleVentaModel;

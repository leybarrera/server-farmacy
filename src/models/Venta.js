import { DataTypes } from 'sequelize';

const VentaModel = (conn) => {
  conn.define(
    'Venta',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },

      monto: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      UsuarioId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
      },
      voucher: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM,
        values: ['Pendiente', 'Procesando', 'Rechazado', 'Pagado'],
        defaultValue: 'Pendiente',
      },
    },
    {
      timestamps: false,
    }
  );
};

export default VentaModel;

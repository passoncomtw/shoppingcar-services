import { makePaginate } from "sequelize-cursor-pagination";

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        field: "user_id",
        type: DataTypes.NUMBER,
      },
      isPaid: {
        field: "is_paid",
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      productCount: {
        field: "product_count",
        type: DataTypes.NUMBER,
        get() {
          const rawValue = this.getDataValue("productCount");
          return Number(rawValue);
        },
      },
      totalAmount: {
        field: "total_amount",
        type: DataTypes.NUMBER,
        get() {
          const rawValue = this.getDataValue("totalAmount");
          return Number(rawValue);
        },
      },
    },
    {
      sequelize,
      tableName: "orders",
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  Order.paginate = makePaginate(Order);

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      as: "user",
      foreignKey: {
        name: "user_id",
      },
    });
    Order.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: {
        name: "order_id",
      },
    });
  };

  return Order;
};

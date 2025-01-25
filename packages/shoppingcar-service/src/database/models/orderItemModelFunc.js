import { makePaginate } from "sequelize-cursor-pagination";

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      productId: {
        field: "product_id",
        type: DataTypes.NUMBER,
      },
      merchantId: {
        field: "merchant_id",
        type: DataTypes.NUMBER,
      },
      orderId: {
        field: "order_id",
        type: DataTypes.UUID,
        allowNull: false,
      },
      amount: {
        field: "amount",
        type: DataTypes.NUMBER,
        get() {
          const rawValue = this.getDataValue("amount");
          return Number(rawValue);
        },
      },
    },
    {
      sequelize,
      tableName: "order_items",
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  OrderItem.paginate = makePaginate(OrderItem);

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Merchant, {
      as: "merchant",
      foreignKey: {
        name: "merchant_id",
      },
    });
    OrderItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: {
        name: "product_id",
      },
    });
    OrderItem.belongsTo(models.Order, {
      as: "order",
      foreignKey: {
        name: "order_id",
      },
    });
  };

  return OrderItem;
};

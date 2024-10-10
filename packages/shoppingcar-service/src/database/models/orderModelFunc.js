import { makePaginate } from "sequelize-cursor-pagination";

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      userId: {
        field: "user_id",
        type: DataTypes.NUMBER,
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
    },
  );

  Order.paginate = makePaginate(Order);

  Order.associate = function (models) {
   
  };

  return Order;
};

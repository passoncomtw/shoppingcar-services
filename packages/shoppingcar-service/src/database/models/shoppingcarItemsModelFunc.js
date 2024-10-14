import { makePaginate } from "sequelize-cursor-pagination";

module.exports = (sequelize, DataTypes) => {
  const ShoppingcarItem = sequelize.define(
    "ShoppingcarItem",
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
      shoppingcarId: {
        field: "shoppingcar_id",
        type: DataTypes.NUMBER,
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
      tableName: "shoppingcar_items",
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  ShoppingcarItem.paginate = makePaginate(ShoppingcarItem);

  ShoppingcarItem.associate = function (models) {
    ShoppingcarItem.belongsTo(models.Merchant, {
      as: "merchant",
      foreignKey: {
        name: "merchant_id",
      },
    });
    ShoppingcarItem.belongsTo(models.Product, {
      as: "product",
      foreignKey: {
        name: "product_id",
      },
    });
    ShoppingcarItem.belongsTo(models.Shoppingcar, {
      as: "shoppingcarItems",
      foreignKey: {
        name: "shoppingcar_id",
      },
    });
  };

  return ShoppingcarItem;
};

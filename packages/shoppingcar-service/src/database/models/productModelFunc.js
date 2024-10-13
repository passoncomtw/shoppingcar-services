import { makePaginate } from "sequelize-cursor-pagination";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        field: "name",
        type: DataTypes.STRING,
        length: 20,
      },
      subtitle: {
        field: "subtitle",
        type: DataTypes.STRING,
      },
      description: {
        field: "description",
        type: DataTypes.STRING,
      },
      price: {
        field: "price",
        type: DataTypes.NUMBER(10, 2),
        get() {
          const rawValue = this.getDataValue("price");
          return Number(rawValue);
        },
      },
      stockAmount: {
        field: "stock_amount",
        type: DataTypes.NUMBER(11, 0),
        get() {
          const rawValue = this.getDataValue("stockAmount");
          return Number(rawValue);
        },
      },
      merchantId: {
        field: "merchant_id",
        type: DataTypes.NUMBER(11, 0),
      },
    },
    {
      sequelize,
      tableName: "products",
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  );

  Product.paginate = makePaginate(Product);

  Product.associate = function (models) {
    Product.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: {
        name: "product_id",
      },
    });
    Product.hasOne(models.ShoppingcarItem, {
      as: "shoppingcarItem",
      foreignKey: {
        name: "product_id",
      },
    });
    Product.belongsTo(models.Merchant, {
      as: "merchant",
      foreignKey: {
        name: "merchant_id",
      },
    });
  };

  return Product;
};

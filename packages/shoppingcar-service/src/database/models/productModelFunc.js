import {makePaginate} from "sequelize-cursor-pagination";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
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
      },
      stockAmount: {
        field: "stock_amount",
        type: DataTypes.NUMBER(11, 0),
      },
      merchantId: {
        field: "merchant_id",
        type: DataTypes.NUMBER(11, 0),
      },
    }, {
    sequelize,
    tableName: "products",
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  });

  Product.paginate = makePaginate(Product);

  Product.associate = function (models) {
    Product.belongsTo(models.Merchant, {
      foreignKey: {
        name: 'id'
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
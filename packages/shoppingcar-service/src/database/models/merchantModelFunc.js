import {makePaginate} from "sequelize-cursor-pagination";
import {saltHashPassword} from "~/helpers/utils";

module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define(
    "Merchant",
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
        length: 30,
      },
      phone: {
        field: "phone",
        type: DataTypes.STRING,
        length: 30,
        unique: true,
      },
      email: {
        field: "email",
        type: DataTypes.STRING,
        length: 30,
        unique: true,
      },
      password: {
        field: "password",
        type: DataTypes.STRING,
        length: 200,
        set(value) {
          this.setDataValue("password", saltHashPassword(value));
        },
      },
    }, {
    sequelize,
    tableName: "merchants",
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  });

  Merchant.paginate = makePaginate(Merchant);

  Merchant.associate = function (models) {
    Merchant.hasMany(models.OrderItem, {
      as: "orderItems",
      foreignKey: {
        name: "merchant_id",
      },
    });
    Merchant.hasOne(models.ShoppingcarItem, {
      as: "shoppingcarItem",
      foreignKey: {
        name: "merchant_id",
      },
    });
    Merchant.hasMany(models.Product, {
      foreignKey: {
        name: 'merchant_id'
      },
    });
  };

  return Merchant;
};
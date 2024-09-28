import {makePaginate} from "sequelize-cursor-pagination";
import {saltHashPassword} from "~/helpers/utils";

module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define(
    "Merchant",
    {
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
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return Merchant;
};
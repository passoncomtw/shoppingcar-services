import { makePaginate } from "sequelize-cursor-pagination";
import { saltHashPassword } from "~/helpers/utils";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
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
      phone: {
        field: "phone",
        type: DataTypes.STRING,
        length: 20,
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
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    }
  );

  User.paginate = makePaginate(User);

  User.associate = function (models) {
    User.hasOne(models.Shoppingcar, {
      as: "shoppingcar",
      foreignKey: {
        name: "user_id",
      },
    });
  };

  return User;
};

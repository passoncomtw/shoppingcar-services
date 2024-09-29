import {makePaginate} from "sequelize-cursor-pagination";
import {saltHashPassword} from "~/helpers/utils";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
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
    }, {
    sequelize,
    tableName: "users",
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  });

  User.paginate = makePaginate(User);

  User.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return User;
};
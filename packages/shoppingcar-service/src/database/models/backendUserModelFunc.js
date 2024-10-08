import {saltHashPassword} from "~/helpers/utils";

module.exports = (sequelize, DataTypes) => {
  const BackendUser = sequelize.define(
    "BackendUser",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      account: {
        field: "account",
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
    tableName: "backend_users",
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  });

  BackendUser.associate = function (models) {
    // User.hasMany(models.Contract, {
    //   as: 'contracts',
    //   foreignKey: {
    //     name: 'user_id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'CASCADE',
    // });
  };

  return BackendUser;
};

import { makePaginate } from 'sequelize-cursor-pagination';

module.exports = (sequelize, DataTypes) => {
  const Shoppingcar = sequelize.define(
    'Shoppingcar',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        field: 'user_id',
        type: DataTypes.NUMBER,
      },
      productCount: {
        field: 'product_count',
        type: DataTypes.NUMBER,
        get() {
          const rawValue = this.getDataValue('productCount');
          return Number(rawValue);
        },
      },
      totalAmount: {
        field: 'total_amount',
        type: DataTypes.NUMBER,
        get() {
          const rawValue = this.getDataValue('totalAmount');
          return Number(rawValue);
        },
      },
    },
    {
      sequelize,
      tableName: 'shoppingcars',
      timestamps: true,
      underscored: true,
      freezeTableName: true,
    },
  );

  Shoppingcar.paginate = makePaginate(Shoppingcar);

  Shoppingcar.associate = function (models) {
    Shoppingcar.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        name: 'user_id',
      },
    });
    Shoppingcar.hasMany(models.ShoppingcarItem, {
      as: 'shoppingcarItems',
      foreignKey: {
        name: 'shoppingcar_id',
      },
    });
  };

  return Shoppingcar;
};

import Sequelize from 'sequelize';
import config from "~/database/config/config";

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const userModelFunc = require("./userModelFunc");
const userModel = userModelFunc(sequelize, Sequelize.DataTypes);
db.User = userModel;

const backendUserModelFunc = require("./backendUserModelFunc");
const BackendUserModel = backendUserModelFunc(sequelize, Sequelize.DataTypes);
db.BackendUser = BackendUserModel;

const merchantModelFunc = require("./merchantModelFunc");
const MerchantModel = merchantModelFunc(sequelize, Sequelize.DataTypes);
db.Merchant = MerchantModel;

const productModelFunc = require("./productModelFunc");
const ProductModel = productModelFunc(sequelize, Sequelize.DataTypes);
db.Product = ProductModel;

const shoppingcarModel = require("./shoppingcarModelFunc");
const ShoppingcarModel = shoppingcarModel(sequelize, Sequelize.DataTypes);
db.Shoppingcar = ShoppingcarModel;

const shoppingcarItemModel = require("./shoppingcarItemsModelFunc");
const ShoppingcarItemModel = shoppingcarItemModel(sequelize, Sequelize.DataTypes);
db.ShoppingcarItem = ShoppingcarItemModel;

const orderModelFunc = require("./orderModelFunc");
const orderModel = orderModelFunc(sequelize, Sequelize.DataTypes);
db.Order = orderModel;

const orderItemModelFunc = require("./orderItemModelFunc");
const orderItemModel = orderItemModelFunc(sequelize, Sequelize.DataTypes);
db.OrderItem = orderItemModel;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

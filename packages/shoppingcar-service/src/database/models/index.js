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

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

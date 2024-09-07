'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      phone: {
        type: Sequelize.STRING,
        length: 30,
      },
      password: {
        type: Sequelize.STRING,
        length: 255,
      },
      name: {
        type: Sequelize.STRING,
        length: 30,
      },
      email: {
        type: Sequelize.STRING,
        length: 100,
      },
      status: {
        type: Sequelize.TINYINT,
        defaultValue: 0,
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
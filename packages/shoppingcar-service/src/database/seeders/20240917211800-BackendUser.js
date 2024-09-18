module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'backend_users',
    [
      {
        account: 'admin',
        password: "6f11a2b6107bac62cb549adf8114326c135dd7fd636be74103c0d4b0ea6996ca2cca66f2de53ea5d12b0b0079998375bb2893bcfcc416b2fe04c82bac5f52b90",
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('backend_users', null, {}),
};
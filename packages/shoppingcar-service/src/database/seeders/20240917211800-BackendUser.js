module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'backend_users',
    [
      {
        account: 'admin',
        password: "b41b96887429bbbb0840c4610584c2ecd53ce1d2395812fcd38ef7079f7abbeea108aa1bf518397b404727cb481646632186c38b630dc20b7f927dfd7268225a",
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('backend_users', null, {}),
};
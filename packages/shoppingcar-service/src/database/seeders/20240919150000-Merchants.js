module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'merchants',
    [
      {
        name: 'passondemo001',
        email: 'foyag97556@asaud.com',
        phone: '0987654322',
        password: "6f11a2b6107bac62cb549adf8114326c135dd7fd636be74103c0d4b0ea6996ca2cca66f2de53ea5d12b0b0079998375bb2893bcfcc416b2fe04c82bac5f52b90",
      },
      {
        name: 'passondemo002',
        email: 'dacidi6155@heweek.com',
        phone: '0987654323',
        password: "6f11a2b6107bac62cb549adf8114326c135dd7fd636be74103c0d4b0ea6996ca2cca66f2de53ea5d12b0b0079998375bb2893bcfcc416b2fe04c82bac5f52b90",
      },
      {
        name: 'passondemo003',
        email: 'wosehe3611@cetnob.com',
        phone: '0987654324',
        password: "6f11a2b6107bac62cb549adf8114326c135dd7fd636be74103c0d4b0ea6996ca2cca66f2de53ea5d12b0b0079998375bb2893bcfcc416b2fe04c82bac5f52b90",
      },
      {
        name: 'passondemo004',
        email: 'forefot313@degcos.com',
        phone: '0987654325',
        password: "6f11a2b6107bac62cb549adf8114326c135dd7fd636be74103c0d4b0ea6996ca2cca66f2de53ea5d12b0b0079998375bb2893bcfcc416b2fe04c82bac5f52b90",
      },
      {
        name: 'passondemo005',
        email: 'wadep69695@asaud.com',
        phone: '0987654326',
        password: "6f11a2b6107bac62cb549adf8114326c135dd7fd636be74103c0d4b0ea6996ca2cca66f2de53ea5d12b0b0079998375bb2893bcfcc416b2fe04c82bac5f52b90",
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('merchants', null, {}),
};
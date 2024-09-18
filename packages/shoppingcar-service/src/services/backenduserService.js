const database = require("../database/models");

const getBackendUserWithPasswordBy = async (account) => {
  return await database.BackendUser.findOne({
    where: {
      account,
    },
  });
};

module.exports.getBackendUserWithPasswordBy = getBackendUserWithPasswordBy;

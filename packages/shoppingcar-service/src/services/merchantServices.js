const database = require("../database/models");

const createMerchantService = async (createMerchantRequest) => {
  return await database.Merchant.create(createMerchantRequest);
};

// for unitest
const removeMerchantsServices = async (query) => {
  return await database.Merchant.destroy(query);
};

module.exports.createMerchantService = createMerchantService;
module.exports.removeMerchantsServices = removeMerchantsServices;

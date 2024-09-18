const database = require("../database/models");

const createMerchantService = async (createMerchantRequest) => {
  return await database.Merchant.create(createMerchantRequest);
};

module.exports.createMerchantService = createMerchantService;

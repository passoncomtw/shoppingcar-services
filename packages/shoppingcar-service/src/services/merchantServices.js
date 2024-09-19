const database = require("../database/models");
const isEmpty = require("lodash/isEmpty");

const createMerchantService = async (createMerchantRequest) => {
  return await database.Merchant.create(createMerchantRequest);
};

const getMerchantsServices = async (query) => {
  const {pageSize = 10, endCursor = null} = query;
  const result = await database.Merchant.paginate({
    limit: pageSize,
    after: endCursor,
    attributes: ["id", "name", "email", "phone"],
    group: ['Merchant.id'],
  });
  const items = result.edges.map(item => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

// for unitest
const removeMerchantsServices = async (query) => {
  return await database.Merchant.destroy(query);
};

module.exports.getMerchantsServices = getMerchantsServices;
module.exports.createMerchantService = createMerchantService;
module.exports.removeMerchantsServices = removeMerchantsServices;

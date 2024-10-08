import database from "~/database/models";

const createMerchantResult = async (createMerchantRequest) => {
  return await database.Merchant.create(createMerchantRequest);
};

const getMerchantsResult = async (query) => {
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

const getMerchantItemsResult = async () => {
  return await database.Merchant.findAll({
    attributes: ["id", "name"],
  });
};

const getMerchantResult = (whereCondition) => {
  return database.Merchant.findOne({
    attributes: ["id", "name", "email", "phone"],
    where: whereCondition
  });
}
// for unitest
const removeMerchantsResult = async (query) => {
  return await database.Merchant.destroy(query);
};

module.exports.getMerchantResult = getMerchantResult;
module.exports.getMerchantItemsResult = getMerchantItemsResult;
module.exports.getMerchantsResult = getMerchantsResult;
module.exports.createMerchantResult = createMerchantResult;
module.exports.removeMerchantsResult = removeMerchantsResult;

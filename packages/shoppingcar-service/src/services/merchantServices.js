import isEmpty from "lodash/isEmpty";
import database from "~/database/models";

const createMerchantResult = async (createMerchantRequest) => {
  return await database.Merchant.create(createMerchantRequest);
};

const getMerchantsResult = async (query) => {
  const { pageSize = 10, endCursor = null } = query;
  const result = await database.Merchant.paginate({
    limit: pageSize,
    after: endCursor,
    attributes: ["id", "name", "email", "phone"],
    group: ["Merchant.id"],
  });
  const items = result.edges.map((item) => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

const getMerchantItemsResult = async () => {
  const items = await database.Merchant.findAll({
    attributes: ["id", "name"],
  });
  return { items };
};

const getMerchantResult = (whereCondition) => {
  return database.Merchant.findOne({
    attributes: ["id", "name", "email", "phone"],
    where: whereCondition,
  });
};

const updateMerchantResult = async (merchantId, body) => {
  const merchantResult = await getMerchantResult({ id: merchantId });
  if (isEmpty(merchantResult)) {
    throw new Error("商家不存在");
  }

  if (body.name) {
    merchantResult.name = body.name;
  }

  if (body.phone) {
    merchantResult.phone = body.phone;
  }

  if (body.email) {
    merchantResult.email = body.email;
  }

  if (body.password) {
    merchantResult.password = body.password;
  }

  await merchantResult.save();
  await merchantResult.reload();

  return merchantResult;
};
// for unitest
const removeMerchantsResult = async (query) => {
  return await database.Merchant.destroy(query);
};

module.exports.getMerchantResult = getMerchantResult;
module.exports.getMerchantItemsResult = getMerchantItemsResult;
module.exports.getMerchantsResult = getMerchantsResult;
module.exports.createMerchantResult = createMerchantResult;
module.exports.updateMerchantResult = updateMerchantResult;
module.exports.removeMerchantsResult = removeMerchantsResult;

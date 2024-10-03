import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import  {getMerchantResult} from "./merchantServices";

const getProductsResult = async (query) => {
  const {pageSize = 10, endCursor = null} = query;
  const result = await database.Product.paginate({
    limit: pageSize,
    after: endCursor,
    include: [
      {        
        model: database.Merchant,     
           
        attributes: ["id", "name", "email", "phone"],
      }
    ],
    attributes: ["id", "name", "stockAmount", "price", "subtitle", "description"],
    group: ['Product.id', 'Merchant.id'],
  });
  const items = result.edges.map(item => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

const getProductsByMerchantIdResult = async (merchantId, query) => {
  const {pageSize = 10, endCursor = null} = query;
  const result = await database.Product.paginate({
    where: {
      merchant_id: merchantId,
    },
    limit: pageSize,
    after: endCursor,
    include: [
      {        
        model: database.Merchant,     
           
        attributes: ["id", "name", "email", "phone"],
      }
    ],
    attributes: ["id", "name", "stockAmount", "price", "subtitle", "description"],
    group: ['Product.id', 'Merchant.id'],
  });
  const items = result.edges.map(item => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

const createProductResult = async (createProductRequest) => {
  const merchantResult = await getMerchantResult({id: createProductRequest.merchantId});
  if (isEmpty(merchantResult)){
    throw new Error("商家不存在");
  }

  const result = await database.Product.create({
    ...createProductRequest,
    merchant: merchantResult,
  }, {
    include: [database.Merchant],
  });
  return {
    id: result.id,
    name: result.name,
    price: result.price,
    stockAmount: result.stockAmount,
    description: result.description,
    subtitle: result.subtitle,
    merchant: {
      id: merchantResult.id,
      name: merchantResult.name,
      phone: merchantResult.phone,
      email: merchantResult.email,
    },
  };
};

const removeProductResult = async (query) => {
  return await database.Product.destroy(query);
};

module.exports.getProductsResult = getProductsResult;
module.exports.getProductsByMerchantIdResult = getProductsByMerchantIdResult;
module.exports.createProductResult = createProductResult;
module.exports.removeProductResult = removeProductResult;

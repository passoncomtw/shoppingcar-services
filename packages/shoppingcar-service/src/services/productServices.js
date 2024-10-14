import pick from "lodash/pick";
import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import { getMerchantResult } from "./merchantServices";

const getProductsResult = async (query) => {
  const { pageSize = 10, endCursor = null } = query;
  const result = await database.Product.paginate({
    limit: pageSize,
    after: endCursor,
    include: [
      {
        as: "merchant",
        model: database.Merchant,
        attributes: ["id", "name", "email", "phone"],
      },
    ],
    attributes: ["id", "name", "stockAmount", "price", "subtitle", "description"],
    group: ["Product.id", "merchant.id"],
  });
  const items = result.edges.map((item) => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

const getProductResult = async (productId) => {
  const productResult = await database.Product.findOne({
    attributes: ["id", "name", "stockAmount", "price", "subtitle", "description"],
    where: { id: productId },
  });

  if (isEmpty(productResult)) {
    throw new Error("產品不存在");
  }

  return productResult;
};

const getProductsByMerchantIdResult = async (merchantId, query) => {
  const { pageSize = 10, endCursor = null } = query;
  const result = await database.Product.paginate({
    where: {
      merchant_id: merchantId,
    },
    limit: pageSize,
    after: endCursor,
    include: [
      {
        as: "merchant",
        model: database.Merchant,
        attributes: ["id", "name", "email", "phone"],
      },
    ],
    attributes: ["id", "name", "stockAmount", "price", "subtitle", "description"],
    group: ["Product.id", "merchant.id"],
  });
  const items = result.edges.map((item) => item.node);
  return {
    items,
    totalCount: result.totalCount,
    pageInfo: result.pageInfo,
  };
};

const getProductInformationIdResult = async (whereCondition) => {
  return await database.Product.findOne({
    attributes: ["id", "name", "stockAmount", "price", "subtitle", "description"],
    include: [
      {
        as: "merchant",
        model: database.Merchant,
        attributes: ["id", "name", "email", "phone"],
      },
    ],
    where: whereCondition,
  });
};

const updateProductResult = async (productId, updateProductRequest) => {
  const productResult = await getProductResult(productId);
  if (isEmpty(productResult)) {
    throw new Error("商品不存在");
  }

  if (updateProductRequest.name) {
    productResult.name = updateProductRequest.name;
  }

  if (updateProductRequest.price) {
    productResult.price = updateProductRequest.price;
  }

  if (updateProductRequest.stockAmount) {
    productResult.stockAmount = updateProductRequest.stockAmount;
  }

  if (updateProductRequest.description) {
    productResult.description = updateProductRequest.description;
  }

  if (updateProductRequest.subtitle) {
    productResult.subtitle = updateProductRequest.subtitle;
  }

  await productResult.save();
  await productResult.reload();

  return pick(productResult, ["id", "name", "stockAmount", "price", "subtitle", "description"]);
};

const createProductResult = async (createProductRequest) => {
  const merchantResult = await getMerchantResult({ id: createProductRequest.merchantId });
  if (isEmpty(merchantResult)) {
    throw new Error("商家不存在");
  }

  const result = await database.Product.create(createProductRequest);
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

module.exports.getProductResult = getProductResult;
module.exports.getProductsResult = getProductsResult;
module.exports.getProductsByMerchantIdResult = getProductsByMerchantIdResult;
module.exports.getProductInformationIdResult = getProductInformationIdResult;
module.exports.createProductResult = createProductResult;
module.exports.updateProductResult = updateProductResult;
module.exports.removeProductResult = removeProductResult;

import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import  {getMerchantResult} from "./merchantServices";

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

module.exports.createProductResult = createProductResult;
module.exports.removeProductResult = removeProductResult;

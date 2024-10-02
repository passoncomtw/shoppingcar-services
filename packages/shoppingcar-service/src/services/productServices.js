import isEmpty from "lodash/isEmpty";
import database from "~/database/models";
import  {getMerchantResult} from "./merchantServices";

const createProductResult = async (createProductRequest) => {
  const merchantResult = await getMerchantResult({id: createProductRequest.merchantId});
  if (isEmpty(merchantResult)){
    throw new Error("商家不存在");
  }

  return await database.Product.create({
    ...createProductRequest,
    merchant: merchantResult,
  }, {
    include: [database.Merchant],
  });
};

module.exports.createProductResult = createProductResult;

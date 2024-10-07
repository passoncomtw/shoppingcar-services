import {responseErrWithMsg, responseOk} from "~/helpers/response";
import { getMerchantsResult } from "~/services/merchantServices";
import {getProductsByMerchantIdResult} from "~/services/productServices";

/**
 * @typedef AppMerchantInformation
 * @property {number} id.required
 *  - console merchant Id
 *  - eg: 1
 * @property {string} name.required
 *   - merchant name
 *   - eg: testmerchant001
 * @property {string} phone.required
 *   - merchant phone
 *   - eg: 0987654321
 * @property {string} email.required
 *   - merchant email
 *   - eg: aaa@bbb.ccc
 */

/**
 * @typedef AppProductInformation
 * @property {Number} id.required
 *  - console product Id
 *  - eg: 1
 * @property {String} name.required
 *   - product name
 *   - eg: testproduct001
 * @property {Number} price.required
 *   - product price
 *   - eg: 100
 * @property {Number} stockAmount.required
 *   - product stock amount
 *   - eg: 100
 * @property {Number} merchantId.required
 *   - merchant id
 *   - eg: 1
 * @property {String} description.required
 *   - product description
 *   - eg: product description
 * @property {String} subtitle.required
 *   - product subtitle
 *   - eg: product subtitle
 * @property {AppMerchantInformation.model} merchant.required
 * - console merchant infromation
 */

/**
 * @typedef AppMerchantsResponse
 * @property {Array<AppMerchantInformation>} items.required
 *   - merchant items
 * @property {integer} totalCount.required
 *   - Total Count
 *   - eg: 100
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
 */

/**
 * @typedef AppProductsResponse
 * @property {Array<AppProductInformation>} items.required
 *   - merchant items
 * @property {integer} totalCount.required
 *   - Total Count
 *   - eg: 100
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
 */

/**
 * Get Merchant API.
 * @group AppMerchants
 * @route GET /app/merchants
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {AppMerchantsResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppMerchantsResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getMerchantsRoute = async (req, res) => {
  try {
    const result = await getMerchantsResult(req.query);
    return responseOk(res,  result);
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Get Products By Merchant ID API.
 * @group AppProduct
 * @route GET /app/merchants/{merchantId}/products
 * @param {String} merchantId.path
 *   - 商家 ID
 *   - eg: 1
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {AppProductsResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppProductsResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getProductsByMerchantIdRouter = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const result = await getProductsByMerchantIdResult(merchantId, req.query);
    return responseOk(res,  result);
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.getProductsByMerchantIdRouter= getProductsByMerchantIdRouter;
module.exports.getMerchantsRoute = getMerchantsRoute;

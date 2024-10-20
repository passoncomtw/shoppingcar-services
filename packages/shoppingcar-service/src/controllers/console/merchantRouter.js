import pick from "lodash/pick";
import { responseErrWithMsg, responseOk } from "~/helpers/response";
import { createMerchantRequestSchema, updateMerchantRequestSchema } from "~/helpers/schemas";
import {
  createMerchantResult,
  getMerchantItemsResult,
  getMerchantResult,
  getMerchantsResult,
  updateMerchantResult,
} from "~/services/merchantServices";

/**
 * @typedef PageInfoItem
 * @property {boolean} hasNextPage.required
 *   - 是否有下一頁
 *   - eg: true
 * @property {boolean} hasPreviousPage.required
 *   - 是否有下一頁
 *   - eg: true
 * @property {string} startCursor.required
 *   - 開始第一筆的錨點
 *   - eg: WzU3XQ==
 * @property {string} endCursor.required
 *   - 最後一筆的錨點
 *   - eg: WzU3XQ==
 */

/**
 * @typedef ConsoleCreateMerchantRequest
 * @property {string} name.required
 *   - merchant name
 *   - eg: testmerchant001
 * @property {string} phone.required
 *   - merchant phone
 *   - eg: 0987654321
 * @property {string} email.required
 *   - merchant email
 *   - eg: aaa@bbb.ccc
 * @property {string} password.required
 *   - password: 6 ~ 20 個英數組合
 *   - eg: a12345678
 */

/**
 * @typedef ConsoleUpdateMerchantRequest
 * @property {string} name
 *   - merchant name
 *   - eg: testmerchant001
 * @property {string} phone
 *   - merchant phone
 *   - eg: 0987654321
 * @property {string} email
 *   - merchant email
 *   - eg: aaa@bbb.ccc
 * @property {string} password
 *   - password: 6 ~ 20 個英數組合
 *   - eg: a12345678
 */

/**
 * @typedef ConsoleUpdateMerchantRequest
 * @property {string} name
 *   - merchant name
 *   - eg: testuser001
 * @property {string} phone
 *   - merchant phone
 *   - eg: 0987654321
 * @property {string} email
 *   - merchant email
 *   - eg: aaa@bbb.ccc
 * @property {string} password
 *   - password: 6 ~ 20 個英數組合
 *   - eg: a12345678
 */

/**
 * @typedef ConsoleMerchantInformation
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
 * @typedef ConsoleMerchantResponse
 * @property {ConsoleMerchantInformation.model} item.required
 *  - console user information
 */

/**
 * @typedef ConsoleMerchantsResponse
 * @property {Array<ConsoleMerchantInformation>} items.required
 *   - merchant items
 * @property {integer} totalCount.required
 *   - Total Count
 *   - eg: 100
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
 */

/**
 * @typedef ConsoleMerchantItemsResponse
 * @property {Array<ConsoleMerchantInformation>} items.required
 *   - merchant items
 */

/**
 * @typedef ConsoleCreateMerchantResponse
 * @property {ConsoleMerchantInformation.model} item.required
 *  - console merchant information
 */

/**
 * Create Merchant API.
 * @group ConsoleMerchant
 * @route POST /console/merchants
 * @param {ConsoleCreateMerchantRequest.model} data.body.required - the new point
 * @returns {ConsoleCreateMerchantResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleCreateMerchantResponse
 * @property {{integer}} code - response code - eg: 200
 */
const createMerchantRoute = async (req, res) => {
  try {
    const createMerchantRequest = await createMerchantRequestSchema.validate(req.body);
    const result = await createMerchantResult(createMerchantRequest);
    const item = pick(result, ["id", "name", "phone", "email"]);
    return responseOk(res, {
      item,
    });
  } catch (error) {
    const err = error.errors[0];
    if (err.message) {
      return responseErrWithMsg(res, err.message);
    } else {
      return responseErrWithMsg(res, err);
    }
  }
};

/**
 * Update Merchant API.
 * @group ConsoleMerchant
 * @route PUT /console/merchants/{merchantId}
 * @param {String} merchantId.path
 *   - 商家 ID
 *   - eg: 1
 * @param {ConsoleUpdateMerchantRequest.model} data.body.required - the new point
 * @returns {ConsoleMerchantResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleMerchantResponse
 * @property {{integer}} code - response code - eg: 200
 */
const updateMerchantRouter = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const updateMerchantRequest = await updateMerchantRequestSchema.validate(req.body);
    const result = await updateMerchantResult(merchantId, updateMerchantRequest);
    const item = pick(result, ["id", "name", "phone", "email"]);
    return responseOk(res, {
      item,
    });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Get Merchants API.
 * @group ConsoleMerchant
 * @route GET /console/merchants
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} startCursor.query
 *   - 結束的標的 pageInfo.startCursor
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {ConsoleMerchantsResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleMerchantsResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getMerchantsRoute = async (req, res) => {
  try {
    const result = await getMerchantsResult(req.query);
    return responseOk(res, result);
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Get Merchant API.
 * @group ConsoleMerchant
 * @route GET /console/merchants/{merchantId}
 * @param {String} merchantId.path
 *   - 商家 ID
 *   - eg: 1
 * @returns {ConsoleMerchantResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleMerchantResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getMerchantRoute = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const item = await getMerchantResult({ id: merchantId });
    return responseOk(res, { item });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Get Merchant items API.
 * @group ConsoleMerchant
 * @route GET /console/merchants/items
 * @returns {ConsoleMerchantItemsResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleMerchantItemsResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getMerchantItemsRoute = async (req, res) => {
  try {
    const result = await getMerchantItemsResult(req.query);
    return responseOk(res, result);
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.getMerchantRoute = getMerchantRoute;
module.exports.getMerchantsRoute = getMerchantsRoute;
module.exports.getMerchantItemsRoute = getMerchantItemsRoute;
module.exports.createMerchantRoute = createMerchantRoute;
module.exports.updateMerchantRouter = updateMerchantRouter;

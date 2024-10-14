import { responseErrWithMsg, responseOk } from "~/helpers/response";
import { clearShoppingcarItemsResult, getShoppingcarsResult } from "~/services/shoppingcarServices";

/**
 * @typedef ConsoleProductInformation
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
 * @property {String} description.required
 *   - product description
 *   - eg: product description
 * @property {String} subtitle.required
 *   - product subtitle
 *   - eg: product subtitle
 */

/**
 * @typedef ConsoleShoppingcarItemInformation
 * @property {Number} id.required
 *  - app shoppingcar item Id
 *  - eg: 1
 * @property {Number} productCount.required
 *  - app shoppingcar 產品數量
 *  - eg: 5
 * @property {Number} totalAmount.required
 *  - app shoppingcar 價格總額
 *  - eg: 1000
 * @property {ConsoleUserInformation.model} user.required
 *   - user 資訊
 */

/**
 * @typedef ConsoleShoppingcarsResponse
 * @property {Array<ConsoleShoppingcarItemInformation>} items.required
 *   - merchant items
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
 */

/**
 * Get Shoppingcars information API.
 * @group ConsoleShoppingcar
 * @route GET /console/shoppingcars
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {ConsoleShoppingcarsResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleShoppingcarsResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getShoppingcarsRouter = async (req, res) => {
  const result = await getShoppingcarsResult(req.query);
  return responseOk(res, result);
};

/**
 * Clear Shoppingcar API.
 * @group ConsoleShoppingcar
 * @route DELETE /console/shoppingcars/{userId}
 * @param {String} userId.path
 *   - 會員 ID
 *   - eg: 1
 * @returns {Object} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef Object
 * @property {{Number}} code - response code - eg: 200
 */
const clearShoppingcarRouter = async (req, res) => {
  try {
    const { userId } = req.params;
    await clearShoppingcarItemsResult(userId);
    return responseOk(res, {});
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.getShoppingcarsRouter = getShoppingcarsRouter;
module.exports.clearShoppingcarRouter = clearShoppingcarRouter;

import { responseOk } from "~/helpers/response";
import { getConsoleOrdersResult } from "~/services/orderServices";

/**
 * @typedef ConsoleOrderItem
 * @property {Number} id.required
 *  - app 訂單 item Id
 *  - eg: 1
 * @property {Number} productCount.required
 *  - app 訂單 產品數量
 *  - eg: 5
 * @property {Number} totalAmount.required
 *  - app 訂單 價格總額
 *  - eg: 1000
 * @property {ConsoleUserInformation.model} user.required
 *   - user 資訊
 */

/**
 * @typedef ConsoleOrdersResponse
 * @property {Array<ConsoleOrderItem>} items.required
 *   - 訂單 items
 * @property {integer} totalCount.required
 *   - Total Count
 *   - eg: 100
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
 */

/**
 * Get Orders API.
 * @group ConsoleOrder
 * @route GET /console/orders
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {ConsoleOrdersResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleOrdersResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getOrdersRouter = async (req, res) => {
  const result = await getConsoleOrdersResult(req.query);
  return responseOk(res, result);
};

module.exports.getOrdersRouter = getOrdersRouter;

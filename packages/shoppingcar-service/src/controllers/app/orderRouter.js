import { responseErrWithMsg, responseOk } from "~/helpers/response";
import {
  createOrderResult,
  getOrderInformationResult,
  getOrdersResult,
  updateOrderPayStatusResult,
} from "~/services/orderServices";

/**
 * @typedef AppCreateOrderRequest
 * @property {Array} shoppingcarItemIds.required
 *  - shoppingcaritem id 陣列
 *  -eg: [1, 2, 3]
 */

/**
 * @typedef AppCreateOrderResponse
 * @property {Array} orderIds.required
 *  - order id 陣列
 *  - eg: ["81669846-5914-4f03-b0b4-d6e85f4dc7f8", "9d3dc21d-d2d4-4942-9384-79ee1c1aa4a2"]
 */

/**
 * @typedef AppShoppingcarItemInformation
 * @property {Number} id.required
 *  - app shoppingcar item Id
 *  - eg: 1
 * @property {String} amount.required
 *   - product 數量
 *   - eg: 1
 * @property {AppProductInformation.model} product.required
 *   - product 資訊
 * @property {AppMerchantInformation.model} merchant.required
 *   - product 資訊

/**
 * @typedef AppOrderItem
 * @property {Number} id.required
 *  - app shoppingcar Id
 *  - eg: 1
 * @property {Number} totalAmount.required
 *   - 購物車所有額度
 *   - eg: 100
 */

/**
 * @typedef AppOrderItemInformation
 * @property {Number} id.required
 *  - app order item Id
 *  - eg: 1
 * @property {AppMerchantInformation.model} merchant.required
 *   - merchant information
 * @property {AppProductInformation.model} product.required
 *   - product information
 */

/**
 * @typedef AppItemInformation
 * @property {Number} id.required
 *  - app order uuid Id
 *  - eg: 81669846-5914-4f03-b0b4-d6e85f4dc7f8
 * @property {Number} totalAmount.required
 *   - 購物車所有額度
 *   - eg: 100
 * @property {Array<AppOrderItemInformation>} orderItems.required
 *   - product information
 *   - eg: 100
 */

/**
 * @typedef AppOrderInformation
 * @property {Number} id.required
 *  - app shoppingcar Id
 *  - eg: 1
 * @property {Number} productCount.required
 *   - product 數量
 *   - eg: 1
 * @property {Number} totalAmount.required
 *   - 購物車所有額度
 *   - eg: 100
 * @property {AppUserInformation.model} user.required
 *   - 使用者資訊
 * @property {Array<AppShoppingcarItemInformation>} shoppingcarItems.required
 *   - 在購物車的產品資訊
 */

/**
 * Create Order From Shoppingcar API.
 * @group AppOrder
 * @route POST /app/orders
 * @param {AppCreateOrderRequest.model} data.body.required - the new point
 * @returns {AppCreateOrderResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppCreateOrderResponse
 * @property {{integer}} code - response code - eg: 200
 */
const createOrderRouter = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shoppingcarItemIds } = req.body;
    const result = await createOrderResult(userId, shoppingcarItemIds);
    return responseOk(res, { items: [result.id] });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Update Order pay status API.
 * @group AppOrder
 * @route PUT /app/orders/{orderId}/payment
 * @param {String} orderId.path
 *   - 訂單 ID
 *   - eg: 81669846-5914-4f03-b0b4-d6e85f4dc7f8
 * @returns {Object} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef Object
 * @property {{integer}} code - response code - eg: 200
 */
const updateOrderPayStatusRouter = async (req, res) => {
  try {
    const { orderId } = req.params;
    await updateOrderPayStatusResult(orderId);
    return responseOk(res, {});
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * @typedef AppOrdersResponse
 * @property {Array<AppOrderItem>} items.required
 *   - merchant items
 * @property {integer} totalCount.required
 *   - Total Count
 *   - eg: 100
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
 */

/**
 * Get Orders API.
 * @group AppOrder
 * @route GET /app/orders
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {AppOrdersResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppOrdersResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getOrdersRouter = async (req, res) => {
  const result = await getOrdersResult(req.query);
  return responseOk(res, result);
};

/**
 * @typedef AppOrderInformationResponse
 * @property {AppItemInformation.model} item.required
 *   - order item information
 */

/**
 * Get Order Information API.
 * @group AppOrder
 * @route GET /app/orders/{orderId}
 * @param {String} orderId.path
 *   - 訂單 ID
 *   - eg: 81669846-5914-4f03-b0b4-d6e85f4dc7f8
 * @returns {AppOrderInformationResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppOrderInformationResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getOrderInformationRouter = async (req, res) => {
  try {
    const { orderId } = req.params;
    const item = await getOrderInformationResult(orderId);
    return responseOk(res, { item });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.getOrdersRouter = getOrdersRouter;
module.exports.getOrderInformationRouter = getOrderInformationRouter;
module.exports.createOrderRouter = createOrderRouter;
module.exports.updateOrderPayStatusRouter = updateOrderPayStatusRouter;

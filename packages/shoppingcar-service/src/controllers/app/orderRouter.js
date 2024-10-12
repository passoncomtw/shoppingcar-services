import {responseOk, responseErrWithMsg} from "~/helpers/response";
import {createOrderResult} from "~/services/orderServices";
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
        const {shoppingcarItemIds} = req.body;
        const result = await createOrderResult(userId, shoppingcarItemIds);
        return responseOk(res,  {items: [result.id]});
      } catch (error) {
        return responseErrWithMsg(res, error.message);
      }
};

module.exports.createOrderRouter = createOrderRouter;

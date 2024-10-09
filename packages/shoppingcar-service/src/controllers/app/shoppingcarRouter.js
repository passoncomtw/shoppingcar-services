import {responseOk, responseErrWithMsg} from "~/helpers/response";
import {getShoppingcarDetailResult, appendProductToShoppingcarResult} from "~/services/shoppingcarService";

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
 * @property {String} description.required
 *   - product description
 *   - eg: product description
 * @property {String} subtitle.required
 *   - product subtitle
 *   - eg: product subtitle
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
 * @typedef AppShoppingcarInformation
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
 * @typedef AppAppendShoppingcarRequest
 * @property {Number} amount.required
 *   - 增加的數量
 *   - eg: 2
 */

/**
 * Get Shoppingcar information By User ID API.
 * @group AppShoppingcar
 * @route GET /app/shoppingcars
 * @returns {AppShoppingcarInformation.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppShoppingcarInformation
 * @property {{integer}} code - response code - eg: 200
 */
const getShoppingcarRouter = async (req, res) => {
  const userId = req.user.id;
  const shoppingcarResult = await getShoppingcarDetailResult(userId);
  return responseOk(res,  {item: shoppingcarResult});
};

/**
 * Append Product to Shoppingcar API.
 * @group AppShoppingcar
 * @route POST /app/shoppingcars/{merchantId}/products/{productId}
 * @param {String} merchantId.path
 *   - 商家 ID
 *   - eg: 1
 * @param {String} productId.path
 *   - 商家 ID
 *   - eg: 1
 * @param {AppAppendShoppingcarRequest.model} data.body.required - the new point
 * @returns {AppShoppingcarInformation.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppShoppingcarInformation
 * @property {{integer}} code - response code - eg: 200
 */
const appendProductToShoppingcar = async (req, res) => {
    try {
        const { merchantId, productId } = req.params;
        const { amount } = req.body;
        const userId = req.user.id;

        await appendProductToShoppingcarResult({
            userId,
            merchantId,
            productId,
            amount,
        });

        const shoppingcarResult = await getShoppingcarDetailResult(userId);
        return responseOk(res,  {item: shoppingcarResult});
      } catch (error) {
        return responseErrWithMsg(res, error.message);
      }
};

module.exports.getShoppingcarRouter = getShoppingcarRouter;
module.exports.appendProductToShoppingcar = appendProductToShoppingcar;

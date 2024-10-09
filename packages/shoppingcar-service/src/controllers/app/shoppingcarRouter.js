import {responseOk, responseErrWithMsg} from "~/helpers/response";
import {appendProductToShoppingcarResult} from "~/services/shoppingcarService";
import {signinRequestSchema} from "~/helpers/schemas";

/**
 * @typedef AppAppendShoppingcarRequest
 * @property {Number} amount.required
 *   - 增加的數量
 *   - eg: 2
 */
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
 * @returns {Object} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef Object
 * @property {{integer}} code - response code - eg: 200
 */
const appendProductToShoppingcar = async (req, res) => {
    try {
        const { merchantId, productId } = req.params;
        const { amount } = req.body;
        const result = await appendProductToShoppingcarResult({
            userId: req.user.id,
            merchantId,
            productId,
            amount,
        });
        return responseOk(res,  {item: {}});
      } catch (error) {
        console.log("🚀 ~ appendProductToShoppingcar ~ error.message:", error.message)
        return responseErrWithMsg(res, error.message);
      }
};

module.exports.appendProductToShoppingcar = appendProductToShoppingcar;

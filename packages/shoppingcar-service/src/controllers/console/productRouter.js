import { responseErrWithMsg, responseOk } from "~/helpers/response";
import { createProductRequestSchema, updateProductRequestSchema } from "~/helpers/schemas";
import {
  createProductResult,
  getProductInformationIdResult,
  getProductsResult,
  updateProductResult,
} from "~/services/productServices";

/**
 * @typedef ConsoleCreateProductRequest
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
 */

/**
 * @typedef ConsoleUpdateProductRequest
 * @property {String} name
 *   - product name
 *   - eg: testproduct001
 * @property {Number} price
 *   - product price
 *   - eg: 100
 * @property {Number} stockAmount
 *   - product stock amount
 *   - eg: 100
 * @property {String} description
 *   - product description
 *   - eg: product description
 * @property {String} subtitle
 *   - product subtitle
 *   - eg: product subtitle
 */

/**
 * @typedef ConsoleProductWithMerchantInformation
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
 * @property {ConsoleMerchantInformation.model} merchant.required
 * - console merchant infromation
 */

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
 * @property {Number} merchantId.required
 *   - merchant id
 *   - eg: 1
 * @property {String} description.required
 *   - product description
 *   - eg: product description
 * @property {String} subtitle.required
 *   - product subtitle
 *   - eg: product subtitle
 */

/**
 * @typedef ConsoleProductWithMerchantInformationResponse
 * @property {ConsoleProductWithMerchantInformation.model} item.required
 *  - console product information
 */

/**
 * @typedef ConsoleProductResponse
 * @property {ConsoleProductInformation.model} item.required
 *  - console product information
 */

/**
 * @typedef ConsoleProductsResponse
 * @property {Array<ConsoleProductInformation>} items.required
 *   - merchant items
 * @property {integer} totalCount.required
 *   - Total Count
 *   - eg: 100
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
 */

/**
 * Get Products API.
 * @group ConsoleProduct
 * @route GET /console/products
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} startCursor.query
 *   - 結束的標的 pageInfo.startCursor
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {ConsoleProductsResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleProductsResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getProductsRouter = async (req, res) => {
  try {
    const result = await getProductsResult(req.query);
    return responseOk(res, result);
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Get Product API.
 * @group ConsoleProduct
 * @route GET /console/products/{productId}
 * @param {String} productId.path
 *   - 商品 ID
 *   - eg: 1
 * @returns {ConsoleProductWithMerchantInformationResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleProductWithMerchantInformationResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getProductRouter = async (req, res) => {
  try {
    const { productId } = req.params;
    const item = await getProductInformationIdResult({ id: productId });
    return responseOk(res, { item });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Create Product API.
 * @group ConsoleProduct
 * @route POST /console/products
 * @param {ConsoleCreateProductRequest.model} data.body.required - the new point
 * @returns {ConsoleProductResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleProductResponse
 * @property {{Number}} code - response code - eg: 200
 */
const createProductRouter = async (req, res) => {
  try {
    const createProductRequest = await createProductRequestSchema.validate(req.body);
    const result = await createProductResult(createProductRequest);
    return responseOk(res, {
      item: result,
    });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Update Product API.
 * @group ConsoleProduct
 * @route PUT /console/products/{productId}
 * @param {String} productId.path
 *   - 商品 ID
 *   - eg: 1
 * @param {ConsoleUpdateProductRequest.model} data.body.required - the new point
 * @returns {ConsoleProductResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleProductResponse
 * @property {{Number}} code - response code - eg: 200
 */
const updateProductRouter = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateProductRequest = await updateProductRequestSchema.validate(req.body);
    const result = await updateProductResult(productId, updateProductRequest);
    return responseOk(res, {
      item: result,
    });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.getProductRouter = getProductRouter;
module.exports.getProductsRouter = getProductsRouter;
module.exports.createProductRouter = createProductRouter;
module.exports.updateProductRouter = updateProductRouter;

import pick from "lodash/pick";
import {responseErrWithMsg, responseOk} from "~/helpers/response";
import {createProductRequestSchema} from "~/helpers/schemas";
import {createProductResult} from "~/services/productServices";

/**
 * @typedef ConsoleCreateProductRequest
 * @property {string} name.required
 *   - product name
 *   - eg: testproduct001
 * @property {number} price.required
 *   - product price
 *   - eg: 100
 * @property {number} stockAmount.required
 *   - product stock amount
 *   - eg: 100
 * @property {number} merchantId.required
 *   - merchant id
 *   - eg: 1
 * @property {string} description.required
 *   - product description
 *   - eg: product description
 * @property {string} subtitle.required
 *   - product subtitle
 *   - eg: product subtitle
 */

/**
 * @typedef ConsoleProductInformation
 * @property {number} id.required
 *  - console product Id
 *  - eg: 1
 * @property {string} name.required
 *   - product name
 *   - eg: testproduct001
 * @property {number} price.required
 *   - product price
 *   - eg: 100
 * @property {number} stockAmount.required
 *   - product stock amount
 *   - eg: 100
 * @property {number} merchantId.required
 *   - merchant id
 *   - eg: 1
 * @property {string} description.required
 *   - product description
 *   - eg: product description
 * @property {string} subtitle.required
 *   - product subtitle
 *   - eg: product subtitle
 * @property {ConsoleMerchantInformation.model} merchant.required
 * - console merchant infromation
 */

/**
 * @typedef ConsoleCreateProductResponse
 * @property {ConsoleProductInformation.model} item.required 
 *  - console product information
 */

/**
 * Create Product API.
 * @group ConsoleProduct
 * @route POST /console/products
 * @param {ConsoleCreateProductRequest.model} data.body.required - the new point
 * @returns {ConsoleCreateProductResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleCreateProductResponse
 * @property {{integer}} code - response code - eg: 200
 */
const createProductRouter = async (req, res) => {
  try {
    const createProductRequest = await createProductRequestSchema.validate(req.body);
    const result = await createProductResult(createProductRequest);
    console.log("🚀 ~ createProductRouter ~ result:", result)
    const item = pick(result, ['id', 'name', 'price', 'stockAmount']);
    return responseOk(res,  {
      item
    });
  }catch(error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.createProductRouter = createProductRouter;

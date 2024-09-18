const pick = require("lodash/pick");
const { responseErrWithMsg, responseOk } = require("../../helpers/response");
const { createMerchantRequestSchema } = require("../../helpers/schemas");
const { createMerchantService } = require("../../services/merchantServices");

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
const createMerchantRoute = async (req, res, user) => {
  try {
    const createMerchantRequest = await createMerchantRequestSchema.validate(req.body);
    const result = await createMerchantService(createMerchantRequest);
    const item = pick(result, ['id', 'name', 'phone', 'email']);
    return responseOk(res,  {
      item
    });
  } catch(error) {
    const err = error.errors[0];
    if (err.message) {
      return responseErrWithMsg(res, err.message);
    } else {
      return responseErrWithMsg(res, err);
    }
    
  }
};

module.exports.createMerchantRoute = createMerchantRoute;
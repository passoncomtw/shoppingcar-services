import pick from "lodash/pick";
import {responseErrWithMsg, responseOk} from "~/helpers/response";
import {createUserRequestSchema} from "~/helpers/schemas";
import {createUserService} from "~/services/userServices";


/**
 * @typedef ConsoleCreateUserRequest
 * @property {string} name.required
 *   - merchant name
 *   - eg: testmerchant001
 * @property {string} phone.required
 *   - merchant phone
 *   - eg: 0987654321
 * @property {string} password.required
 *   - password: 6 ~ 20 個英數組合
 *   - eg: a12345678
 */

/**
 * @typedef ConsoleUserInformation
 * @property {number} id.required
 *  - console merchant Id
 *  - eg: 1
 * @property {string} name.required
 *   - merchant name
 *   - eg: testmerchant001
 * @property {string} phone.required
 *   - merchant phone
 *   - eg: 0987654321
 */

/**
 * @typedef ConsoleCreateUserResponse
 * @property {ConsoleUserInformation.model} item.required 
 *  - console merchant information
 */

/**
 * Create User API.
 * @group ConsoleUser
 * @route POST /console/users
 * @param {ConsoleCreateUserRequest.model} data.body.required - the new point
 * @returns {ConsoleCreateUserResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleCreateUserResponse
 * @property {{integer}} code - response code - eg: 200
 */
const createUserRouter = async (req, res) => {
  try {
    const createUserRequest = await createUserRequestSchema.validate(req.body);
    const result = await createUserService(createUserRequest);
    const item = pick(result, ['id', 'name', 'phone']);
    return responseOk(res,  {
      item
    });
  }catch(error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.createUserRouter = createUserRouter;

import pick from "lodash/pick";
import {responseErrWithMsg, responseOk} from "~/helpers/response";
import {createUserRequestSchema} from "~/helpers/schemas";
import {createUserService, getUsersService} from "~/services/userServices";


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
 * @typedef ConsoleGetUserResponse
 * @property {Array<ConsoleUserInformation>} items.required
 *   - merchant items
 * @property {integer} totalCount.required
 *   - Total Count
 *   - eg: 100
 * @property {PageInfoItem.model} pageInfo.required
 *   - 分頁資訊
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


/**
 * Get User API.
 * @group ConsoleUser
 * @route GET /console/users
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {ConsoleGetUserResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleGetUserResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getUsersRouter = async (req, res) => {
  try {
    const result = await getUsersService(req.query);
    return responseOk(res,  result);
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.createUserRouter = createUserRouter;
module.exports.getUsersRouter = getUsersRouter;

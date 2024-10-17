import pick from "lodash/pick";
import { responseErrWithMsg, responseOk } from "~/helpers/response";
import { createUserRequestSchema, updateUserRequestSchema } from "~/helpers/schemas";
import { createUserResult, getUserByUserIdResult, getUsersResult, updateUserByUserIdResult } from "~/services/userServices";

/**
 * @typedef ConsoleCreateUserRequest
 * @property {string} name.required
 *   - user name
 *   - eg: testuser001
 * @property {string} phone.required
 *   - user phone
 *   - eg: 0987654321
 * @property {string} password.required
 *   - password: 6 ~ 20 個英數組合
 *   - eg: a12345678
 */

/**
 * @typedef ConsoleUpdateUserRequest
 * @property {string} name
 *   - user name
 *   - eg: testuser001
 * @property {string} phone
 *   - user phone
 *   - eg: 0987654321
 */

/**
 * @typedef ConsoleUserInformation
 * @property {number} id.required
 *  - console user Id
 *  - eg: 1
 * @property {string} name.required
 *   - user name
 *   - eg: testuser001
 * @property {string} phone.required
 *   - user phone
 *   - eg: 0987654321
 */

/**
 * @typedef ConsoleUserResponse
 * @property {ConsoleUserInformation.model} item.required
 *  - console user information
 */

/**
 * @typedef ConsoleGetUserResponse
 * @property {Array<ConsoleUserInformation>} items.required
 *   - user items
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
 * @returns {ConsoleUserResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleUserResponse
 * @property {{integer}} code - response code - eg: 200
 */
const createUserRouter = async (req, res) => {
  try {
    const createUserRequest = await createUserRequestSchema.validate(req.body);
    const result = await createUserResult(createUserRequest);
    const item = pick(result, ["id", "name", "phone"]);
    return responseOk(res, {
      item,
    });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Update User API.
 * @group ConsoleUser
 * @route PUT /console/users/{userId}
 * @param {String} userId.path
 *   - 會員 ID
 *   - eg: 1
 * @param {ConsoleUpdateUserRequest.model} data.body.required - the new point
 * @returns {ConsoleUserResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleUserResponse
 * @property {{integer}} code - response code - eg: 200
 */
const updateUserRouter = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateUserRequest = await updateUserRequestSchema.validate(req.body);
    const result = await updateUserByUserIdResult(userId, updateUserRequest);
    const item = pick(result, ["id", "name", "phone"]);
    return responseOk(res, {
      item,
    });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Get Users API.
 * @group ConsoleUser
 * @route GET /console/users
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} startCursor.query
 *   - 結束的標的 pageInfo.startCursor
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
    const result = await getUsersResult(req.query);
    return responseOk(res, result);
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

/**
 * Get User By UserId API.
 * @group ConsoleUser
 * @route GET /console/users/{userId}
 * @param {String} userId.path
 *   - 會員 ID
 *   - eg: 1
 * @returns {ConsoleUserResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleUserResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getUserByUserIdRouter = async (req, res) => {
  try {
    const { userId } = req.params;
    const item = await getUserByUserIdResult(userId);
    return responseOk(res, { item });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.createUserRouter = createUserRouter;
module.exports.getUsersRouter = getUsersRouter;
module.exports.getUserByUserIdRouter = getUserByUserIdRouter;
module.exports.updateUserRouter = updateUserRouter;

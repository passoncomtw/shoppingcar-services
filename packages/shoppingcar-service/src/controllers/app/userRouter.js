import isEmpty from "lodash/isEmpty";
import { responseErrWithMsg, responseOk } from "~/helpers/response";
import { getUserByUserIdService } from "~/services/userServices";

/**
 * @typedef AppUserInformation
 * @property {number} id.required
 *  - user Id
 *  - eg: 1
 * @property {string} name.required
 *   - user name
 *   - eg: testuser001
 * @property {string} phone.required
 *   - user phone
 *   - eg: 0987654321
 */

/**
 * Get Users API.
 * @group AppUser
 * @route GET /app/users/self
 * @returns {AppUserInformation.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppUserInformation
 * @property {{integer}} code - response code - eg: 200
 */
const getUserDetailRouter = async (req, res) => {
  try {
    const userResult = await getUserByUserIdService(req.user.id);
    if (isEmpty(userResult)) throw new Error("會員不存在或 Token 失效");

    return responseOk(res, { item: userResult });
  } catch (error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.getUserDetailRouter = getUserDetailRouter;

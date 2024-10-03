import {responseErrWithMsg, responseOk} from "~/helpers/response";


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
 * @route GET /app/users
 * @returns {AppUserInformation.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef AppUserInformation
 * @property {{integer}} code - response code - eg: 200
 */
const getUserDetailRouter = async (req, res) => {
  return responseOk(res, {item: req.user})
};

module.exports.getUserDetailRouter = getUserDetailRouter;

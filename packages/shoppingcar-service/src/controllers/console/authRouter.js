import jwt from 'jsonwebtoken';
import passport from 'passport';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';

const { responseOk, responseErrWithMsg } = require("../../helpers/response");
const { consoleSigninRequestSchema } = require("../../helpers/schemas");

const { AUTH_SECRET } = process.env;

/**
 * @typedef ConsoleLoginRequest
 * @property {string} account.required
 *   - auth0 Response.sub
 *   - eg: admin
 * @property {string} password.required
 *   - password: 6 ~ 20 個英數組合
 *   - eg: a12345678
 */

/**
 * @typedef ConsoleMemberInformation
 * @property {number} id.required
 *  - console member Id
 *  - eg: 1
 * @property {string} account.required
 *  - console member account
 *  - eg: admin
 */

/**
 * @typedef LoginResponse
 * @property {[string]} token.required - JWT token string
 * @property {ConsoleMemberInformation.model} user.required 
 *  - console member information
 */

/**
 * LogIn API.
 * @group ConsoleAuthorization
 * @route POST /console/login
 * @param {ConsoleLoginRequest.model} data.body.required - the new point
 * @returns {LoginResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security none
 * @typedef LoginResponse
 * @property {{integer}} code - response code - eg: 200
 */
export const loginRoute = async (req, res, next) => {
  try {
    await consoleSigninRequestSchema.validate(req.body);
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
  passport.authenticate("console-user", { session: false }, async (error, user) => {
    try {
      if (error) throw error;
      if(isEmpty(user)) {
        throw new Error("使用者不存在");
      }
      // const expireIn = add(new Date(), { days: 1 }).getTime();

      const signInfo = pick(user, ["id", "account"]);
      const token = jwt.sign(
        {
          data: signInfo,
          // exp: expireIn,
        },
        AUTH_SECRET
      );

      return responseOk(res,  {
          token,
          user: signInfo,
        });
    } catch (error) {
      responseErrWithMsg(res, error.message);
    }
  })(req, res, next);
};

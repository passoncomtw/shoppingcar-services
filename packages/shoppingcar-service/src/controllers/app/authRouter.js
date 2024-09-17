const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const pick = require("lodash/pick");
const isEmpty = require("lodash/isEmpty");

const { responseOk, responseErrWithMsg } = require("../../helpers/response");
const { parseUserResponse } = require("../../services/userServices");
const { signinRequestSchema } = require("../../helpers/schemas");

const router = express.Router();

const { AUTH_SECRET } = process.env;

/**
 * @typedef LoginRequest
 * @property {string} phone.required
 *   - auth0 Response.sub
 *   - eg: 0987654321
 * @property {string} password.required
 *   - password: 6 ~ 20 個英數組合
 *   - eg: a12345678
 */

/**
 * @typedef MemberInformation
 * @property {number} id.required
 *  - member Id
 *  - eg: 1
 * @property {string} phone.required
 *  - member.phone
 *  - eg: 0987654321
 * @property {string} name.required
 *  - member name
 *  - eg: testdemo001
 */

/**
 * @typedef LoginResponse
 * @property {[string]} token.required - JWT token string
 * @property {MemberInformation.model} user.required - member information
 */

/**
 * LogIn API.
 * @group AppAuthorization
 * @route POST /app/login
 * @param {LoginRequest.model} data.body.required - the new point
 * @returns {LoginResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security none
 * @typedef LoginResponse
 * @property {{integer}} code - response code - eg: 200
 */
export const loginRoute = async (req, res) => {
  try {
    await signinRequestSchema.validate(req.body);
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
  
  passport.authenticate("app-user", { session: false }, async (error, user) => {
    try {
      if (error) throw error;
      if(isEmpty(user)) {
        throw new Error("使用者不存在");
      }
      console.log("🚀 ~ passport.authenticate ~ user:", user)
      // const expireIn = add(new Date(), { days: 1 }).getTime();

      const signInfo = pick(user, ["id", "phone", "name"]);
      const token = jwt.sign(
        {
          data: signInfo,
          // exp: expireIn,
        },
        AUTH_SECRET
      );

      return responseOk(res,  {
          token,
          user: parseUserResponse(user),
        });
    } catch (error) {
      responseErrWithMsg(res, error.message);
    }
  })(req, res);
};


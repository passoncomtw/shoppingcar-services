import {responseErrWithMsg, responseOk} from "~/helpers/response";
import { getMerchantsResult } from "~/services/merchantServices";

/**
 * Get Merchant API.
 * @group AppMerchants
 * @route GET /app/merchants
 * @param {Number} pageSize.query
 *   - 每頁回傳幾筆資料
 *   - eg: 10
 * @param {String} endCursor.query
 *   - 結束的標的 pageInfo.endCursor
 *   - eg: 10
 * @returns {ConsoleMerchantsResponse.model} 200 - success, return requested data
 * @returns {String} 400 - invalid request params/query/body
 * @returns {String} 404 - required data not found
 * @returns {Error} 500 - unexpected error
 * @security JWT
 * @typedef ConsoleMerchantsResponse
 * @property {{integer}} code - response code - eg: 200
 */
const getMerchantsRoute = async (req, res) => {
  try {
    const result = await getMerchantsResult(req.query);
    return responseOk(res,  result);
  } catch(error) {
    return responseErrWithMsg(res, error.message);
  }
};

module.exports.getMerchantsRoute = getMerchantsRoute;

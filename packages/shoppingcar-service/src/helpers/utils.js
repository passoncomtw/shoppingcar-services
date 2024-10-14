import hmacSHA512 from "crypto-js/hmac-sha512";

const { SALT_SECRET } = process.env;

const debugLog = (msg) => console.log(`[debug] ${msg}`);

const saltHashPassword = (userpassword) => {
  return hmacSHA512(userpassword, SALT_SECRET).toString();
};

module.exports.debugLog = debugLog;
module.exports.saltHashPassword = saltHashPassword;

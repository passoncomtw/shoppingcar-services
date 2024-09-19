const yup = require("yup");

const phoneRegExp = /^09[0-9]{8}$/;

const phoneNumberSchema = yup.string().matches(phoneRegExp, '電話格式錯誤')
const passwordSchema = yup.string().matches(/^(?=.*\d)(?=.*[a-zA-Z]).{7,20}$/, '密碼必須是 6~20 英數混合').required("密碼不可為空");

const signinRequestSchema = yup.object({
  phone: yup.string().required("電話不可為空").matches(phoneRegExp, '電話格式錯誤'),
  password: passwordSchema,
});

const consoleSigninRequestSchema = yup.object({
  account: yup.string().required("帳號不可為空"),
  password: passwordSchema,
});

const registeRequestSchema = yup.object({
  phone: yup.string().required("電話不可為空"),
  name: yup.string().required("暱稱不可為空"),
  password: passwordSchema,
});

const createMerchantRequestSchema = yup.object({
  name: yup.string().required("商家名稱不可為空"),
  phone: yup.string().required("電話不可為空").matches(phoneRegExp, '電話格式錯誤'),
  email: yup.string().email("Email 格式錯誤").required("Email 不可為空"),
  password: passwordSchema,
});

module.exports.phoneNumberSchema = phoneNumberSchema;
module.exports.signinRequestSchema = signinRequestSchema;
module.exports.registeRequestSchema = registeRequestSchema;
module.exports.consoleSigninRequestSchema = consoleSigninRequestSchema;
module.exports.createMerchantRequestSchema = createMerchantRequestSchema;

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

const createUserRequestSchema = yup.object({
  name: yup.string().required("商家名稱不可為空"),
  phone: yup.string().required("電話不可為空").matches(phoneRegExp, '電話格式錯誤'),
  password: passwordSchema,
});

const updateUserRequestSchema = yup.object({
  name: yup.string().nullable().default(null),
  phone: yup.string().matches(phoneRegExp, '電話格式錯誤').nullable().default(null),
});

const createProductRequestSchema = yup.object({
  name: yup.string().required("商品名稱不可為空"),
  price: yup.number().required("商品價格不可為空").test(
    'Is positive?',
    '價格必須大於 0',
    (value) => value > 0
  ),
  stockAmount: yup.number().required("商品庫存不可為空").test(
    'Is positive?',
    '庫存數量必須大於 0',
    (value) => value > 0
  ),
  merchantId: yup.number().required("商家 ID 格式錯誤"),
  subtitle: yup.string().required("商品次抬頭不可為空"),
  description: yup.string().required("商品描述不可為空"),
});

module.exports.phoneNumberSchema = phoneNumberSchema;
module.exports.signinRequestSchema = signinRequestSchema;
module.exports.registeRequestSchema = registeRequestSchema;
module.exports.consoleSigninRequestSchema = consoleSigninRequestSchema;
module.exports.createMerchantRequestSchema = createMerchantRequestSchema;
module.exports.createUserRequestSchema = createUserRequestSchema;
module.exports.createProductRequestSchema = createProductRequestSchema;
module.exports.updateUserRequestSchema = updateUserRequestSchema;

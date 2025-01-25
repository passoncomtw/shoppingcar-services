import * as yup from "yup";

const mixedStringAndNumber = /^(?=.{6,20}$)([a-zA-Z]+\d+|\d+[a-zA-Z]+)\w*$/;
const mixedWordAndStringAndNumber = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/;

export const passwordSchema = yup
  .string("不是正確的文字格式")
  .matches(mixedStringAndNumber, "請輸入6-20碼英數組合，並注意英文有分大小寫")
  .required("請輸入6-20碼英數組合，倂注意英文有分大小寫");

export const userNameSchema = yup.string().matches(mixedWordAndStringAndNumber, "請輸入1-20碼，且不可有特殊符號");

export const phoneSchema = yup
  .string()
  .matches(/^\d{9,11}$/, "請輸入9~11數字")
  .required("請輸入手機號");

export const createUserSchema = yup.object().shape({
  phone: phoneSchema,
  name: userNameSchema,
  password: passwordSchema,
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "密碼和確認密碼不一致"),
});

export const updateUserSchema = yup.object().shape({
  phone: phoneSchema,
  name: userNameSchema,
});

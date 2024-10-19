import * as yup from "yup";
import { passwordSchema, phoneSchema, userNameSchema } from "./user";

const emailSchema = yup.string().email("郵箱格式不正確").required("請輸入郵箱");

export const createMerchantSchema = yup.object().shape({
  phone: phoneSchema,
  name: userNameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "密碼和確認密碼不一致"),
});


export const updateMerchantSchema = yup.object().shape({
    phone: phoneSchema,
    name: userNameSchema,
    email: emailSchema,
  });
  
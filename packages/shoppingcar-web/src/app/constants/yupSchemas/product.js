import * as yup from "yup";

export const createProductSchema = yup.object({
  name: yup.string("必須為字串").required("商品名稱不可為空"),
  merchantId: yup.number("商家 ID 格式錯誤").required("商家不可為空"),
  price: yup.number("必須是數字").required("價格不可為空"),
  stockAmount: yup.number("必須是數字").required("庫存不可為空"),
  description: yup.string("必須為字串").required("描述不可為空"),
  subtitle: yup.string("必須為字串").required("次抬頭不可為空"),
});

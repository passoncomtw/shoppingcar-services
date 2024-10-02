require("dotenv").config();
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import supertest from "supertest";
import server from "~/main";
import {getMerchantResult} from "~/services/merchantServices";
import { token } from "~/constants/mockDatas/settings";
import { mockProduct } from "~/constants/mockDatas/products";
import {removeProductResult} from "~/services/productServices";

const request = supertest.agent(server);
let merchantResult;

describe("測試 後台商品 功能", () => {
  beforeAll(async () => {
    merchantResult = await getMerchantResult({});
    return;
  });
  afterAll(async () => {
    await removeProductResult({where: {name: mockProduct.name}});
    return await server.close();
  });

  it(`should create console product fail. 商家不存在`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send({...mockProduct, merchantId: 999 })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商家不存在");
      })
  });

  it(`should create console product fail. 商家ID不存在`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send(mockProduct)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商家 ID 格式錯誤");
      })
  });

  it(`should create console product fail. 價格欄位不存在`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send({
        name: "jestproduct001",
        stockAmount: 100,
        description: "jest product description",
        subtitle: "jest product subtitle",
        merchantId: merchantResult.id,
       })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商品價格不可為空");
      })
  });

  it(`should create console product fail. 商品庫存欄位不存在`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send({
        name: "jestproduct001",
        price: 100,
        description: "jest product description",
        subtitle: "jest product subtitle",
        merchantId: merchantResult.id,
       })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商品庫存不可為空");
      })
  });

  it(`should create console product fail. description欄位不存在`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send({
        name: "jestproduct001",
        price: 100,
        stockAmount: 100,
        subtitle: "jest product subtitle",
        merchantId: merchantResult.id,
       })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商品描述不可為空");
      })
  });

  it(`should create console product fail. subtitle欄位不存在`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send({
        name: "jestproduct001",
        price: 100,
        stockAmount: 100,
        description: "jest product description",
        merchantId: merchantResult.id,
       })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商品次抬頭不可為空");
      })
  });

  it(`should create console product fail. 產品名稱不存在`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send({
        price: 100,
        stockAmount: 100,
        description: "jest product description",
        subtitle: "jest product subtitle",
        merchantId: merchantResult.id,
       })
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商品名稱不可為空");
      })
  });
  it(`should create console product success.`, async () => {
    return request
      .post("/console/products")
      .set({ Authorization: token })
      .send({...mockProduct, merchantId: merchantResult.id })
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { item = null } = res.body;
        expect(isEmpty(item)).not.toBe(true);
        expect(isNumber(item.id)).toBe(true);
        expect(item.name).toBe(mockProduct.name);
        expect(item.price).toBe(mockProduct.price);
        expect(item.stockAmount).toBe(mockProduct.stockAmount);
        expect(item.description).toBe(mockProduct.description);
        expect(item.subtitle).toBe(mockProduct.subtitle);
        expect(isEmpty(item.merchant)).not.toBe(true);
        const {merchant} = item;
        expect(merchant.id).toBe(merchantResult.id);
        expect(merchant.name).toBe(merchantResult.name);
        expect(merchant.phone).toBe(merchantResult.phone);
        expect(merchant.email).toBe(merchantResult.email);
      })
  });
});

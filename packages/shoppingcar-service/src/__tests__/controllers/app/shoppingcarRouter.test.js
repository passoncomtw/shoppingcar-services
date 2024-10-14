require("dotenv").config();
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import supertest from "supertest";
import server from "~/main";
import { token } from "~/constants/mockDatas/settings";
import {clearShoppingcarItemsResult} from "~/services/shoppingcarServices";

const request = supertest.agent(server);

const MERCHANT_ID = 57;
const PRODUCT_ID = 57;
const USER_ID = 16;

describe("測試 會員 購物車 功能", () => {
  afterAll(async () => {
    await clearShoppingcarItemsResult(USER_ID);
    return server.close();
  });
  
  it("should add product to shoppingcar success", async () => {
    return request
      .post(`/app/shoppingcars/${MERCHANT_ID}/products/${PRODUCT_ID}`)
      .set({ Authorization: token })
      .send({ amount: 2 })
      .then((res) => {
        expect(res.statusCode).toBe(200);
      })
  });

  it("should get products from shoppingcar success", async () => {
    return request
      .get("/app/shoppingcars")
      .set({ Authorization: token })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const {item} = res.body;
        expect(isNumber(item.id)).toBe(true);
        expect(isNumber(item.totalAmount)).toBe(true);
        expect(isNumber(item.productCount)).toBe(true);
        const {user, shoppingcarItems} = item;
        expect(isNumber(user.id)).toBe(true);
        expect(isString(user.name)).toBe(true);
        expect(isString(user.phone)).toBe(true);

        shoppingcarItems.map(shoppingcarItem => {
            expect(isNumber(shoppingcarItem.id)).toBe(true);
            expect(isNumber(shoppingcarItem.amount)).toBe(true);
            const {product, merchant} = shoppingcarItem;
            expect(isNumber(product.id)).toBe(true);
            expect(isNumber(product.price)).toBe(true);
            expect(isNumber(product.stockAmount)).toBe(true);
            expect(isString(product.name)).toBe(true);
            expect(isString(product.description)).toBe(true);
            expect(isString(product.subtitle)).toBe(true);

            expect(isNumber(merchant.id)).toBe(true);
            expect(isString(merchant.name)).toBe(true);
            expect(isString(merchant.phone)).toBe(true);
            expect(isString(merchant.email)).toBe(true);
        });
      })
  });
});
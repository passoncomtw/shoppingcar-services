require("dotenv").config();
import supertest from "supertest";
import server from "~/main";
import { token } from "~/constants/mockDatas/settings";
import {clearShoppingcarItems} from "~/services/shoppingcarService";

const request = supertest.agent(server);

const MERCHANT_ID = 57;
const PRODUCT_ID = 57;
const USER_ID = 16;

describe("測試 會員 購物車 功能", () => {
  afterAll(async () => {
    await clearShoppingcarItems(USER_ID);
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
});
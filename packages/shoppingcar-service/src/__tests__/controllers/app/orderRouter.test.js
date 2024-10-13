require("dotenv").config();
import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
import server from "~/main";
import supertest from "supertest";
import { token } from "~/constants/mockDatas/settings";

const request = supertest.agent(server);

const ORDER_ID = "1d29a87e-e96c-4cbe-aff8-030f11afb3f0";

describe("測試 App 訂單 功能", () => {
  afterAll((done) => {
    server.close();
    done();
  });

  it("should get app orders success", async () => {
    return request
      .get("/app/orders")
      .set({ Authorization: token })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { items } = res.body;
        items.map((item) => {
          expect(isString(item.id)).toBe(true);
          expect(isNumber(item.totalAmount)).toBe(true);
        });
      });
  });
  it("should get app order information success", async () => {
    return request
      .get(`/app/orders/${ORDER_ID}`)
      .set({ Authorization: token })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { items } = res.body;
        items.map((item) => {
          expect(isString(item.id)).toBe(true);
          expect(isNumber(item.totalAmount)).toBe(true);
        });
      });
  });
});

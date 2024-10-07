require("dotenv").config();
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import isBoolean from "lodash/isBoolean";
import server from "~/main";
import supertest from "supertest";
import { token } from "~/constants/mockDatas/settings";

const request = supertest.agent(server);

describe("測試 App 店家 功能", () => {
  afterAll((done) => {
    server.close();
    done();
  });

  
  it("should get app merchants success", async () => {
    return request
    .get("/app/merchants")
    .set({ Authorization: token })
    .query({pageSize: 2})
    .expect(200)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      const { items, totalCount, pageInfo } = res.body;

      expect(items.length).toBe(2);
      expect(isNumber(totalCount)).toBe(true);
      expect(isEmpty(pageInfo)).toBe(false);
      expect(isBoolean(pageInfo.hasNextPage)).toBe(true);
      expect(isBoolean(pageInfo.hasPreviousPage)).toBe(true);
      expect(isString(pageInfo.startCursor)).toBe(true);
      expect(isString(pageInfo.endCursor)).toBe(true);
    });
  });

  it("should get app merchant products success", async () => {
    return request
    .get("/app/merchants/57/products")
    .set({ Authorization: token })
    .query({pageSize: 1})
    .expect(200)
    .then((res) => {
      expect(res.statusCode).toBe(200);
      const { items, totalCount, pageInfo } = res.body;

      expect(items.length<=1).toBe(true);
      expect(isNumber(totalCount)).toBe(true);
      expect(isEmpty(pageInfo)).toBe(false);
    });
  });
});
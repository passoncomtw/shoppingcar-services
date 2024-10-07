require("dotenv").config();
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import server from "~/main";
import supertest from "supertest";
import { token } from "~/constants/mockDatas/settings";

const request = supertest.agent(server);

describe("測試 Authorization 功能", () => {
  afterAll((done) => {
    server.close();
    done();
  });

  
  it("should app user login success", async () => {
    return request
      .get("/app/users/self")
      .set({ Authorization: token })
      .query({})
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { item } = res.body;
        expect(isEmpty(item)).not.toBe(true);
        expect(isNumber(item.id)).toBe(true);
        expect(isString(item.phone)).toBe(true);
        expect(isString(item.name)).toBe(true);
        expect(isString(item.createdAt)).toBe(true);
      })
  });
});
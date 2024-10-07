require("dotenv").config();
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import server from "~/main";
import supertest from "supertest";
import { token } from "~/constants/mockDatas/settings";

const request = supertest.agent(server);

describe("測試 App 會員 功能", () => {
  afterAll((done) => {
    server.close();
    done();
  });

  
  it("should get app user info success", async () => {
    return request
      .get("/app/users/self")
      .set({ Authorization: token })
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
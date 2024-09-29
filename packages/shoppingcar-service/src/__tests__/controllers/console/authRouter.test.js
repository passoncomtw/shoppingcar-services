require("dotenv").config({ path: "../../.env" });
const server = require("~/main");
const request = require('supertest').agent(server);
const isEmpty = require("lodash/isEmpty");
const isNumber = require("lodash/isNumber");

describe("測試 後台使用者 Authorization 功能", () => {
  afterAll((done) => {
    server.close();
    done();
  });
  it("should console user login failed, cos password is empty.", async () => {
    return request
      .post("/console/login")
      .send({ account: "admin" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼不可為空");
       
      })
  });
  it("should console user login failed, cos phone is empty.", async () => {
    return request
      .post("/console/login")
      .send({ password: "a12345678" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("帳號不可為空");
       
      })
  });

  it("should console user login failed, cos password 只有英文.", async () => {
    return request
      .post("/console/login")
      .send({ account: "admin", "password": "aaaaaaa" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
       
      })
  });

  it("should console user login failed, cos password 只有數字.", async () => {
    return request
      .post("/console/login")
      .send({ account: "admin", "password": "11111111" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
       
      })
  });
  it("should console user login failed, cos password 只有五個字元.", async () => {
    return request
      .post("/console/login")
      .send({ account: "admin", "password": "a1234" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");       
      })
  });
  it("should console user login failed, cos password 有二十一個字元.", async () => {
    return request
      .post("/console/login")
      .send({ account: "admin", "password": "a12345678901234567890" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");       
      })
  });
  it("should console user login success", async () => {
    return request
      .post("/console/login")
      .send({ account: "admin", password: "a12345678" })
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { token = null, user = null } = res.body;
        expect(token).not.toBe(null);
        expect(isEmpty(user)).not.toBe(true);
        expect(isNumber(user.id)).toBe(true);
        expect(user.account).toBe("admin");
      })
  });
});
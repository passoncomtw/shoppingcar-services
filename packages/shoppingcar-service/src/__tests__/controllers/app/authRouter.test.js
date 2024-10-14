require("dotenv").config();
import server from "~/main";
import supertest from "supertest";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";

const request = supertest.agent(server);

describe("測試 Authorization 功能", () => {
  afterAll((done) => {
    server.close();
    done();
  });

  it("should app user login failed, cos password is empty.", async () => {
    return request
      .post("/app/login")
      .send({ phone: "0987654321" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼不可為空");
       
      })
  });
  it("should app user login failed, cos phone is empty.", async () => {
    return request
      .post("/app/login")
      .send({ password: "a12345678" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("電話不可為空");
       
      })
  });

  it("should app user login failed, cos phone number format error.", async () => {
    return request
      .post("/app/login")
      .send({ "phone": "111111111", "password": "a12345678" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("電話格式錯誤");
       
      })
  });
  it("should app user login failed, cos password 只有英文.", async () => {
    return request
      .post("/app/login")
      .send({ "phone": "0987654321", "password": "aaaaaaa" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
       
      })
  });

  it("should app user login failed, cos password 只有數字.", async () => {
    return request
      .post("/app/login")
      .send({ "phone": "0987654321", "password": "11111111" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
       
      })
  });
  it("should app user login failed, cos password 只有五個字元.", async () => {
    return request
      .post("/app/login")
      .send({ "phone": "0987654321", "password": "a1234" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");       
      })
  });
  it("should app user login failed, cos password 有二十一個字元.", async () => {
    return request
      .post("/app/login")
      .send({ "phone": "0987654321", "password": "a12345678901234567890" })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");       
      })
  });
  it("should app user login success", async () => {
    return request
      .post("/app/login")
      .send({ phone: "0987654321", password: "a12345678" })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { token = null, user = null } = res.body;        
        expect(token).not.toBe(null);
        expect(isEmpty(user)).not.toBe(true);
        expect(isNumber(user.id)).toBe(true);
        expect(user.phone).toBe("0987654321");
        expect(user.name).toBe("test001");
      })
  });
});
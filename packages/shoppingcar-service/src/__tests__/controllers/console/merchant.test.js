require("dotenv").config();
import server from "~/main";
import supertest from "supertest";
import isEmpty from "lodash/isEmpty";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import isBoolean from "lodash/isBoolean";
import {removeMerchantsResult} from "~/services/merchantServices";
import { mockMerchant } from "~/constants/mockDatas/users";
import { token } from "~/constants/mockDatas/settings";

const request = supertest.agent(server);

describe("測試 後台商家 功能", () => {
  afterAll(async () => {
    await removeMerchantsResult({where: {email: mockMerchant.email}});
    return server.close();
  });

  it("should create console merchant fail. cos 電話為空 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        name: mockMerchant.name,
        email: mockMerchant.email,
        password: mockMerchant.password,
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("電話不可為空");
      })
  });
  it("should create console merchant fail. cos 店家名稱為空 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        email: mockMerchant.email,
        password: mockMerchant.password,
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("商家名稱不可為空");
      })
  });

  it("should create console merchant fail. cos 店家信箱為空 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        name: mockMerchant.name,
        password: mockMerchant.password,
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("Email 不可為空");
      })
  });

  it("should create console merchant fail. cos 店家密碼為空 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        name: mockMerchant.name,
        email: mockMerchant.email,
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼不可為空");
      })
  });

  it("should create console merchant fail. cos 店家密碼只有7個英文字母 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        name: mockMerchant.name,
        email: mockMerchant.email,
        password: "aaaaaaa"
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
      })
  });

  it("should create console merchant fail. cos 店家密碼只有7個數字 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        name: mockMerchant.name,
        email: mockMerchant.email,
        password: "1111111"
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
      })
  });

  it("should create console merchant fail. cos 店家密碼只有5個英文數字混合 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        name: mockMerchant.name,
        email: mockMerchant.email,
        password: "a12345"
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
      })
  });

  it("should create console merchant fail. cos 店家密碼有21個英文數字混合 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        name: mockMerchant.name,
        email: mockMerchant.email,
        password: "a12345678901234567890"
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼必須是 6~20 英數混合");
      })
  });

  it("should create console merchant fail. cos 店家信箱格式錯誤", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: mockMerchant.phone,
        name: mockMerchant.name,
        email: "abcdewaaa",
        password: mockMerchant.password
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("Email 格式錯誤");
      })
  });

  it("should create console merchant fail. cos 店家手機格式錯誤", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({
        phone: "1111111111",
        name: mockMerchant.name,
        email: mockMerchant.email,
        password: mockMerchant.password
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("電話格式錯誤");
      })
  });

  it("should create console merchant success.", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send(mockMerchant)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { item = null } = res.body;
        expect(isEmpty(item)).not.toBe(true);
        expect(isNumber(item.id)).toBe(true);
        expect(item.name).toBe(mockMerchant.name);
        expect(item.phone).toBe(mockMerchant.phone);
        expect(item.email).toBe(mockMerchant.email);
      })
  });
  
  it("should create console merchant fail. cos phone 重複 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({...mockMerchant, email: "ccc@sssss.com"})
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("phone must be unique");
      })
  });

  it("should create console merchant fail. cos phone 重複 ", async () => {
    return request
      .post("/console/merchants")
      .set({ Authorization: token })
      .send({...mockMerchant, phone: "0987654322"})
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("email must be unique");
      })
  });

  it("should get console merchants success.", async () => {
    return request
      .get("/console/merchants")
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
});
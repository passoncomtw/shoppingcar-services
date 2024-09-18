require("dotenv").config({ path: "../../.env" })
const server = require("../../../main")
const request = require('supertest').agent(server);
const isEmpty = require("lodash/isEmpty");
const isNumber = require("lodash/isNumber");
const { removeMerchantsServices } = require("../../../services/merchantServices");

const mockMerchant = {
  "name": "testmerchant001",
  "phone": "0987654321",
  "email": "aaa@bbb.ccc",
  "password": "a12345678"
};

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJhY2NvdW50IjoiYWRtaW4ifSwiaWF0IjoxNzI2Njc2NzE1fQ.LRL3UGQH_dbWs-8Bmc1xzeOWV_wa1WTiCuPAJB1bR8Y";

describe("測試 後台商家 功能", () => {
  afterAll(async () => {
    await removeMerchantsServices({where: {email: mockMerchant.email}});
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
});
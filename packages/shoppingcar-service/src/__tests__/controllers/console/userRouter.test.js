require("dotenv").config({ path: "../../.env" });
const server = require("~/main");
const request = require('supertest').agent(server);
const { removeUsersService } = require("~/services/userServices");
const isEmpty = require("lodash/isEmpty");
const isNumber = require("lodash/isNumber");

const mockUser = {
  name: "testmerchant001",
  phone: "0987665225",
  password: "a12345678"
};

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo1LCJhY2NvdW50IjoiYWRtaW4ifSwiaWF0IjoxNzI3NTkzOTg2fQ.4-g06VK7rcNbq7bCz-93Hcy02K3SYACD0tu93sQOCfk";

describe("測試 後台會員 功能", () => {
  afterAll(async () => {
    await removeUsersService({where: {phone: mockUser.phone}});
    return server.close();
  });

  it("should create console user fail. cos 電話為空 ", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send({
        name: mockUser.name,
        password: mockUser.password,
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("電話不可為空");
      })
  });

  it("should create console user fail. cos 會員密碼為空 ", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send({
        phone: mockUser.phone,
        name: mockUser.name,        
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("密碼不可為空");
      })
  });
it("should create console user fail. cos 會員密碼只有7個英文字母 ", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send({
        phone: mockUser.phone,
        name: mockUser.name,        
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

  it("should create console user fail. cos 會員密碼只有7個數字 ", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send({
        phone: mockUser.phone,
        name: mockUser.name,        
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

  it("should create console user fail. cos 會員密碼只有5個英文數字混合 ", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send({
        phone: mockUser.phone,
        name: mockUser.name,        
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

  it("should create console user fail. cos 會員密碼有21個英文數字混合 ", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send({
        phone: mockUser.phone,
        name: mockUser.name,        
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
  it("should create console user fail. cos 會員手機格式錯誤", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send({
        phone: "1111111111",
        name: mockUser.name,
        password: mockUser.password
      })
      .expect(400)
      .then((res) => {
        expect(res.statusCode).toBe(400);
        const { data } = res.body;
        expect(data).not.toBe(null);
        expect(data.message).toBe("電話格式錯誤");
      })
  });

  it("should create console user success.", async () => {
    return request
      .post("/console/users")
      .set({ Authorization: token })
      .send(mockUser)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        const { item = null } = res.body;
        expect(isEmpty(item)).not.toBe(true);
        expect(isNumber(item.id)).toBe(true);
        expect(item.name).toBe(mockUser.name);
        expect(item.phone).toBe(mockUser.phone);
      })
  });
});
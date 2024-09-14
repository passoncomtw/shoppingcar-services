require("dotenv").config({path: "../../.env"})
const server = require("../main")
const request = require('supertest').agent(server);

describe("GET /api/product/get", () => {
  afterAll(async () => {
    return server.close();
  })
  it("should test api success", async () => {
    return request
      .get("/api")
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      })
  });
});
import request from "supertest"
import { app } from "../src"
import { prismaMock } from "./jest.setup"

describe("User API", () => {

  describe("POST /users", () => {

    it("should create a new user", async () => {

      const createdUser = {
        id: 1,
        email: "test@test.com",
        password: "hashedPassword"
      }

      prismaMock.user.findUnique.mockResolvedValue(null)
      prismaMock.user.create.mockResolvedValue(createdUser as any)

      const response = await request(app)
        .post("/users")
        .send({
          email: "test@test.com",
          password: "truePassword"
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual(createdUser)

    })

  })


  describe("POST /users/login", () => {

    it("should login a user and return a token", async () => {

      const user = {
        id: 1,
        email: "test@test.com",
        password: "hashedPassword"
      }

      prismaMock.user.findUnique.mockResolvedValue(user as any)

      const response = await request(app)
        .post("/users/login")
        .send({
          email: "test@test.com",
          password: "truePassword"
        })

      expect(response.status).toBe(200)
      expect(response.body).toEqual({
        token: "mockedToken"
      })

    })


    it("should return 401 if user does not exist", async () => {

      prismaMock.user.findUnique.mockResolvedValue(null)

      const response = await request(app)
        .post("/users/login")
        .send({
          email: "test@test.com",
          password: "truePassword"
        })

      expect(response.status).toBe(401)

    })


    it("should return 401 if password is incorrect", async () => {

      const user = {
        id: 1,
        email: "test@test.com",
        password: "hashedPassword"
      }

      prismaMock.user.findUnique.mockResolvedValue(user as any)

      const response = await request(app)
        .post("/users/login")
        .send({
          email: "test@test.com",
          password: "wrongPassword"
        })

      expect(response.status).toBe(401)

    })

  })

})
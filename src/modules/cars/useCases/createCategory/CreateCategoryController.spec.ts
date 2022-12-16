import { app } from "@shared/infra/http/app";
import request from "supertest";

describe("Create Category Controller", () => {
    beforeEach(() => {
        
    })
    it("should be able to create a new category", async () => {
        
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin"
        })

        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            name: "Category supertest",
            description: "Category supertest"
        }).set({
            Authorization: "Bearer " + token,
        });

        expect(response.status).toBe(201)
    })
    it("should not be able to create a new category if already exists", async () => {
        
        const responseToken = await request(app).post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin"
        })

        const { token } = responseToken.body

        const response = await request(app).post("/categories").send({
            name: "Category supertest",
            description: "Category supertest"
        }).set({
            Authorization: "Bearer " + token,
        });

        expect(response.status).toBe(400)
    })
})
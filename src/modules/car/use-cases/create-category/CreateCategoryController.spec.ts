import request from "supertest";
import { app } from "@shared/infra/http/app";

describe("Create Category controller", async () =>{
    it("Should be able to create a new category", async() =>{
        const response = await request(app)
        .post("/categories")
        .send({
            name: "Hatch",
            description: "Carro compacto"
        });

        expect(response.status).toBe(201);
    })
});


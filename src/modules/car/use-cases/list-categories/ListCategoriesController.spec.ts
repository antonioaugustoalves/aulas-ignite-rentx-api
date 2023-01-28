import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import createConnection from "@shared/infra/typeorm/index";
import request from "supertest";
import { app } from "@shared/infra/http/app";
let connection: Connection;
describe("List categories, testing controller",
    () => {
        beforeAll(async () => {
            connection = await createConnection();
            await connection.runMigrations();
            const id = uuidv4();
            const password = await hash("admin", 8);
            const sql = `
        INSERT INTO USERS 
        (id, name, email, password, "isAdmin", "createdAt", "driverLicense") 
        values ('${id}', 'Antonio','admin@rentx.com',
        '${password}',
        true, 'now()', '1119459011AB')
        `;
            await connection.query(sql);
        });

        afterAll(async () => {
            await connection.dropDatabase();
            await connection.close();
        });

        it("Should be able to list all categories",
        async() =>{
            const responseToken = await request(app)
        .post("/sessions").send({
            email: "admin@rentx.com",
            password: "admin"
        });

        const {refreshToken} = responseToken.body;

        await request(app).post("/categories").send({
            name: "Test Car Category",
            describe: "This is a test category"
        }).set({
            Authorization: `Bearer ${refreshToken}`
        });

        const response = await request(app).get("/categories");
        console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty("id")
        });


    })
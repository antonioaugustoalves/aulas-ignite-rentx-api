import { Connection } from "typeorm";
import {v4 as uuidv4} from "uuid";
import {hash} from "bcryptjs";
import createConnection from "@shared/infra/typeorm/index";
import request from "supertest";
import { app } from "@shared/infra/http/app";
let connection: Connection;

describe("Testing CreateCategoryController",() =>{
    beforeAll(async() =>{
        connection = await createConnection();
        await connection.runMigrations();
        const id = uuidv4();
        const password = await hash("admin", 8);
        const sql =  `
        INSERT INTO USERS 
        (id, name, email, passowrd, isAdmin, createdAt, driverLicense) 
        values ('${id}', 'Antonio','test@rentx.com','${password}',
        true, 'now()', '1119459011AB')
        `;
  
        await connection.query(sql); 
    });

    afterAll(async () =>{
        // await connection.dropDatabase();
        // await connection.close();
    });

    it("should be able to create a category",
    async () =>{
        const responseToken = await request(app)
        .post("/sessions").send({
            email: "test@rentx.com",
            password: "admin"
        });

        const {refreshToken} = responseToken.body;
        const response = await request(app)
        .post("/categories")
        .send({
            name: "Test Car Category",
            describe: "This is a test category"
        })
        .set({
            Authorization: `Bearer ${refreshToken}`
        });

        expect(response.status).toBe(201);
    });


    it("should not  be able to create a category with duplicated name ",
    async () =>{
        const responseToken = await request(app)
        .post("/sessions").send({
            email: "test@rentx.com",
            password: "admin"
        });

        const {refreshToken} = responseToken.body;
        const response = await request(app)
        .post("/categories")
        .send({
            name: "Test Car Category",
            describe: "This is a test category"
        })
        .set({
            Authorization: `Bearer ${refreshToken}`
        });

        expect(response.status).toBe(201);
    });

    });
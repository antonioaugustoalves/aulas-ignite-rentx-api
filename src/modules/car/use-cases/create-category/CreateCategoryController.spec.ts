import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "@shared/infra/typeorm/index";
import { app } from "@shared/infra/http/app";
import { Connection } from "typeorm";

let connection: Connection;
describe("Create Category controller",  () => {
    beforeAll(async () => {
        connection = await createConnection("localhost");
        await connection.runMigrations();
        const id = uuidv4()
        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO users 
         (id, name, email,password,"driverLicense", "isAdmin", "createdAt") 
         values 
         ('${id}','Antonio Alves','admin@rentx.com', 
         '${password}','2341221113', true, 'now()')`
        );

    });

    afterAll(async () =>{
        await connection.dropDatabase();
        await connection.close();

    });
});
it("Should be able to create a new category", async (): Promise<void> => {
    const responseToken = await request(app)
    .post("/sessions")
    .send({
        email:'admin@rentx.com',
        password: 'admin'
    });

    const {token} = responseToken.body;

    const response = await request(app)
        .post("/categories")
        .send({
            name: "Hatch",
            description: "Carro compacto"
        }).set({Authorization: `Bearer ${token}`});

        expect(response).toBe(201);

    
});



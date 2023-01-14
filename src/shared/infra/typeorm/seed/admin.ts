import createConnection from "../index";
import { v4 as uuidv4 } from "uuid";
import {hash} from "bcrypt";

async function createAdmin(){
    const connection = await createConnection("localhost");
    const id = uuidv4()
    const password = await hash("admin", 8);

    await connection.query(
        `INSERT INTO users 
        (id, name, email,password,"driverLicense", "isAdmin", "createdAt") 
        values 
        ('${id}','Antonio Alves','admin@rentx.com', 
        '${password}','2341221113', true, 'now()')`
        );
}

createAdmin().then(() => console.log('Admin created now'))
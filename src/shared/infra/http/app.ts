import "reflect-metadata";
import express, { NextFunction, Response, Request } from "express";
import "express-async-errors";
import cors from "cors";
import swagggerUI from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import createConnection from "@shared/infra/typeorm/index";
import { router } from "./routes";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";

createConnection();
const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());
app.use("/api/docs", swagggerUI.serve, swagggerUI.setup(swaggerFile));
app.get("/home", (request, response) =>{
    response.status(200).json({message: "HELLO WORLD!"});
});

app.use(router);
app.post("/teste", (request, response) =>{
    const {user, password} = request.body;
    console.log("user: " + user +" - password: " + password);
    response.send("OK")
});

app.use((err:Error, 
    request: Request, 
    response: Response, 
    next: NextFunction)=>{

        if(err instanceof AppError){
            return response.status(err.statusCode).json({message: err.message});
        }

        return response.status(500).json({
            status: "error",
            message: `Internal server error: ${err.message}}`
        })

});

export {app}
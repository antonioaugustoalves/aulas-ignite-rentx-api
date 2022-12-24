import express from "express";
import cors from "cors";
import swagggerUI from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import { router } from "./routes";

const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());
app.use("/api/docs", swagggerUI.serve, swagggerUI.setup(swaggerFile));
app.get("/home", (request, response) =>{
    response.status(200).json({message: "HELLO WORLD!"});
});

app.use(router);

app.listen(port,() =>{
    console.log(`App listening on ${port}`);
});
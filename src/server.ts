import express from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());

app.get("/home", (request, response) =>{
    response.status(200).json({message: "HELLO WORLD!"});
});

app.use(router);

app.listen(port,() =>{
    console.log(`App listening on ${port}`);
});
import express from "express";
import cors from "cors";
import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());

app.get("/home", (request, response) =>{
    response.status(200).json({message: "HELLO WORLD!"});
});

app.use("/categories", categoriesRoutes);



app.listen(port,() =>{
    console.log(`App listening on ${port}`);
});
import express from "express";
import cors from "cors";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specification.routes";

const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());

app.get("/home", (request, response) =>{
    response.status(200).json({message: "HELLO WORLD!"});
});

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRoutes);



app.listen(port,() =>{
    console.log(`App listening on ${port}`);
});
import express from "express";
import cors from "cors";

const app = express();
const port = 3333;
app.use(cors());
app.use(express.json());
const curses = [
    {name: "Java"},
    {name: "Javascrip"},
    {name: "PHP"},
]
app.get("/home", (request, response) =>{
    response.status(200).json({message: "HELLO WORLD!"});
});



app.listen(port,() =>{
    console.log(`App listening on ${port}`);
});
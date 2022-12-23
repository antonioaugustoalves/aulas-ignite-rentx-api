import Router from "express";
import {v4 as uuidv4} from "uuid";
export const categoriesRoutes = Router();
const categories = []
categoriesRoutes.get("/", (request, response) =>{
    response.status(200).json(categories);
});

categoriesRoutes.post("/", (request, response) =>{
    const {name, description} = request.body;
    categories.push({name, description});
    return response.status(201).json({message: "Created"});
});
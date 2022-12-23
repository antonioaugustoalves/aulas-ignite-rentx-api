import Router from "express";
import {v4 as uuidv4} from "uuid";
import { Category } from "../models/Category";

export const categoriesRoutes = Router();
const categories: Category[] = []
categoriesRoutes.get("/", (request, response) =>{
    response.status(200).json(categories);
});

categoriesRoutes.post("/", (request, response) =>{
    const {name, description} = request.body;
    const category:Category = {
        name, 
        description,
        id: uuidv4(),
        createdAt: new Date(),
    }
    categories.push(category);
    return response.status(201).json({message: "Created"});
});
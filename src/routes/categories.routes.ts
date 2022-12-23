import Router from "express";
import { Category } from "../models/Category";

export const categoriesRoutes = Router();
const categories: Category[] = []
categoriesRoutes.get("/", (request, response) =>{
    response.status(200).json(categories);
});

categoriesRoutes.post("/", (request, response) =>{
    const {name, description} = request.body;
    const category = new Category();
    Object.assign(category,{
        name, 
        description,
        createdAt: new Date(),
    });

    categories.push(category);
    return response.status(201).json({message: "Created"});
});
import Router from "express";
import { Category } from "../models/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
export const categoriesRoutes = Router();

const categoriesRepository = new CategoriesRepository();
categoriesRoutes.get("/", (request, response) =>{
   
    const categories = categoriesRepository.list();
    response.status(200).json(categories);
});

categoriesRoutes.post("/", (request, response) =>{
    const {name, description} = request.body;
    const categoryAlreadyExists = categoriesRepository.findByName(name);
    
    if(categoryAlreadyExists){
        return response.status(400).json({message: "Category already exists"});
    }
    
    categoriesRepository.create({name, description});
    return response.status(201).json({message: "Created!"})
    
});
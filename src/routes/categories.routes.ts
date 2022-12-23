import Router from "express";

export const categoriesRoutes = Router();
const categories = []
categoriesRoutes.get("/categories", (request, response) =>{
    response.status(200).json(categories);
});

categoriesRoutes.post("/categories", (request, response) =>{
    const {name, description} = request.body;
    return response.status(201).json({message: "Created"});
});
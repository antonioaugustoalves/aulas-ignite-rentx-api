import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import { CreateCarSpecificationsController } from "@modules/car/use-cases/create-cars-specifications/CreateCarSpecificationsController";
import { CreateCarController } from "@modules/car/use-cases/create-cars/CreateCarController";
import { ListAvaliableCarsController } from "@modules/car/use-cases/list-avaliable-cars/ListAvaliableCarsController";
import { ListCarsController } from "@modules/car/use-cases/list-cars/ListCarsController";
import { UploadImagesController } from "@modules/car/use-cases/upload-images/UploadImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const listAvaliableCarsController = new ListAvaliableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();
const uploadImagesController = new UploadImagesController();
const uploadImages = multer(uploadConfig.upload("./tmp/cars"))
carsRoutes.post("/",
ensureAuthentication, 
ensureAdmin, 
createCarController.handle );

carsRoutes.get("/all", 
ensureAuthentication, 
ensureAdmin, listCarsController.handle);

carsRoutes.get("/avaliable", listAvaliableCarsController.handle);

carsRoutes.post("/specifications/:id",
ensureAuthentication, 
ensureAdmin, 
createCarSpecificationsController.handle);

carsRoutes.post("/images/:id", 
ensureAuthentication,
uploadImages.array("images"),
ensureAdmin, uploadImagesController.handle);

export {carsRoutes}
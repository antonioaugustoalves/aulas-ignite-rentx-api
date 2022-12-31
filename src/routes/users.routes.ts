import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateUserController } from "../modules/account/use-cases/create-user/CreateUserController";
import { UpdateUserAvatarController } from "../modules/account/use-cases/update-user-avatar/UpdateUserAatarController";

const usersRoutes = Router();
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))
usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthentication,
    uploadAvatar.single("avatar"),
     updateUserAvatarController.handle
     );

export {usersRoutes}
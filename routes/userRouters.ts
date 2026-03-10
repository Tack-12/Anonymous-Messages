import { Router } from "express";
import * as UserController from "../controllers/userControllers.ts";
import { isAuth, isAdmin } from "../controllers/authMiddleware.ts";
const userRoutes = Router();


userRoutes.get("/", UserController.userIndex);

//User Routes to login
userRoutes.get("/log-in", UserController.loginUserGet);
userRoutes.post("/log-in", UserController.loginUserPost);

//User Routes to sign up
userRoutes.get("/sign-up", UserController.signUpUserGet);
userRoutes.post("/sign-up", UserController.signUpUserPost);

//User Routes to show messages
userRoutes.get("/messages", UserController.messagesGet);
//userRoutes.get("/messages-admin", isAuth, isAdmin, UserController.messagesAdminGet);

//Post Messages:
//userRoutes.post("/messages", isAuth, UserController.messagesPost);
export default userRoutes;

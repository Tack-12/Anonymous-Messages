import { Router } from "express";
import * as UserController from "../controllers/userControllers.ts";
import { isAuth, isAdmin } from "../controllers/authMiddleware.ts";
const userRoutes = Router();


userRoutes.get("/", UserController.userIndex);
userRoutes.get("/log-in", UserController.loginUserGet);
userRoutes.post("/log-in", UserController.loginUserPost);
userRoutes.get("/sign-up", UserController.signUpUserGet);
userRoutes.post("/sign-up", UserController.signUpUserPost);
userRoutes.get("/messages", isAuth, UserController.messagesGet);
export default userRoutes;

import { Router } from "express";
import * as UserController from "../controllers/userControllers.ts";
import { isAuth, isAdmin } from "../controllers/authMiddleware.ts";
const userRoutes = Router();


//Show the home Page with the Messages
userRoutes.get("/", UserController.messagesGet);

//User Routes to login
userRoutes.get("/log-in", UserController.loginUserGet);
userRoutes.post("/log-in", UserController.loginUserPost);

//User Routes to sign up
userRoutes.get("/sign-up", UserController.signUpUserGet);
userRoutes.post("/sign-up", UserController.signUpUserPost);

//User Routes to show messages
userRoutes.get("/write-messages", isAuth, UserController.insertMessageGet);

//Post Messages:
userRoutes.post("/write-messages", isAuth, UserController.insertMessagePost);

//Delete Message from board:
userRoutes.get("/delete-message/:id", isAuth, isAdmin, UserController.deleteMessageFromBoard);

export default userRoutes;

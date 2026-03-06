import { Router } from "express";
import passport from "../utils/passport";
import * as UserController from "../controllers/userControllers.ts";
const userRoutes = Router();

userRoutes.get("/", UserController.userIndex);
userRoutes.get("/sign-up", UserController.signUpUserGet);
userRoutes.post("/sign-up",);

userRoutes.post("/log-in",);




export default userRoutes;

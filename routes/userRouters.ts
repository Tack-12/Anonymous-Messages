import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (req, res, next) => {
	try {
		res.render("index");
	} catch (err) {
		next(err);
	};
});



export default userRoutes;

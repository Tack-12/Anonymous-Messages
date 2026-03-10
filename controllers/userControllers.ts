import passport from "../utils/passport.ts";
import { body, validationResult, matchedData } from "express-validator";
import pool from "../db/pool.ts";
import bcrypt from "bcryptjs";
import { isAuth } from "./authMiddleware.ts";

const emailErr = "The input must be an email";
const letterErr = "The input must only contain letters";
const lengthErr = "The input must be length of minimum 1 - 20";
const passwordLength = " The length of password is not enough";
const passNoMatch = "The password you have entered doesn't match";

const validateUser = [
	body("firstname").trim().isAlpha().withMessage(`First Name ${letterErr}`)
		.isLength({ min: 1, max: 20 }).withMessage(`First Name ${lengthErr}`),
	body("lastname").trim().isAlpha().withMessage(`Last Name ${letterErr}`)
		.isLength({ min: 1, max: 20 }).withMessage(`Last Name ${lengthErr}`),
	body("email").trim().isEmail().withMessage(emailErr),
	body("password").isLength({ min: 5 }).withMessage(emailErr),
	body('confirm_password').custom((value, { req }) => {
		return value === req.body.password;
	}).withMessage(passNoMatch)
];

export const userIndex = (req, res, next) => {
	try {
		res.render("index", { user: req.user });
	} catch (err) {
		next(err);
	};
}

export const signUpUserGet = (req, res, next) => {
	try {
		res.render("signUp");
	} catch (err) {
		next(err);
	}
}

export const loginUserGet = (req, res, next) => {
	try {
		res.render("login");
	} catch (err) {
		next(err);
	}
}

export const signUpUserPost = [validateUser, async (req, res, next) => {

	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render("signUp", {
				title: "Create user",
				errors: errors.array(),
			});
		}
		const { firstname, lastname, email, password } = matchedData(req);
		const membership = req.body.membership;
		const hashed_password = await bcrypt.hash(password, 10);

		await pool.query(`INSERT INTO users (firstname, lastname, email, password, membership)VALUES ($1, $2, $3, $4, $5)`,
			[firstname, lastname, email, hashed_password, membership]);

		res.redirect("/");
	} catch (err) {
		next(err);
	}
}]

export const loginUserPost = passport.authenticate("local", {
	successRedirect: "/",
	faliureRedirect: "/log-in"
})

export const messagesGet = async (req, res, next) => {

	try {
		const total_data: any = [];
		const { rows } = await pool.query(`SELECT * FROM messages;`);
		const messages = rows;
		for (let i = 0; i < messages.length; i++) {
			const { rows } = await pool.query(`SELECT * FROM users where id = $1 `, [messages[i].userid]);
			total_data.push({ username: rows[0].firstname, notes: messages[i] });

			if (req.isAuthenticated() && req.user.admin === "Admin") {
				return res.render("messageBoard", { data: total_data });
			}
			else if (req.isAuthenticated() && req.user.admin !== "Admin") {
				return res.render("messageBoard", { data: total_data });
			}
			else {
				return res.render("messageBoard", { data: { username: "Anonomoyus", notes: messages } });
			}
		}
	}
	catch (error) {
		next(error);
	};

}

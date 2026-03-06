import passport from "../utils/passport";
import { body, validationResult, CustomValidator, matchedData } from "express-validator";
import pool from "../db/pool";

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

		await pool.query(`INSERT INTO users (firstname, lastname, email, password, membership)VALUES ($1, $2, $3, $4, $5)`,
			[firstname, lastname, email, password, membership]);

		res.redirect("/");
	} catch (err) {
		next(err);
	}
}]

export const loginUser = passport.authenticate("local", {
	successRedirect: "/",
	faliureRedirect: "/"
})

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from "../db/pool.ts";

const data_fields = {
	usernameField: "email",
	passwordField: "password",
}
passport.use(new LocalStrategy(data_fields, async (email, password, done) => {

	try {
		const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
		const user = rows[0];

		if (!user) {
			return done(null, false, { message: "Incorrect Email/Password" });
		}

		const hashed_password = user.password;
		const matched = await bcrypt.compare(password, hashed_password);

		if (!matched) {
			return done(null, false, { message: "Incorrect Email/Password" });
		}

		return done(null, user);

	} catch (err) {
		return done(err);
	}


}));

passport.serializeUser((user, done) => {
	return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { rows } = await pool.query(`SELECT id, firstname, lastname, email, membership FROM users WHERE id=$1`, [id]);
		const user = rows[0];

		return done(null, user);

	} catch (error) {
		return done(error);
	}
});


export default passport;

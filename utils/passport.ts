import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import pool from "../db/pool.ts";


passport.use(new LocalStrategy(async (email, password, done) => {

	try {
		const { rows } = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);
		const username: string = rows[3];

		if (!username) {
			done(null, false, { message: "No Email Provided" });
		}

		const hashed_password = rows[4];
		const matched = await bcrypt.compare(password, hashed_password);

		if (!matched) {
			done(null, false, { message: "No Email Provided" });
		}

	} catch (err) {
		done(err);
	}


}));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		const { row } = await pool.query(`SELECT id, firstname, lastname, email, membership FROM users WHERE id=$1`, [id]);
		const user = row

		done(null, user);

	} catch (error) {
		done(error);
	}
});


export default passport;

import express from "express";
import passport from "./utils/passport.ts";
import session from "express-session";
import * as LocalStrategy from "passport-local";
import * as path from "path";
import userRoutes from "./routes/userRouters.ts";
import dotEnv from "./utils/dotEnv.ts";
import pgSimple from "connect-pg-simple";
import pool from "./db/pool.ts";

//Declaring the basic usage
const __dirname = import.meta.dirname;
const app = express();
const pgSession = pgSimple(session);

//Setting up the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(session({
	secret: dotEnv.SECRET,
	resave: false,
	saveUninitialized: false,
	store: new pgSession({
		pool: pool,
		tableName: "user_sessions",
	}),
}));

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", userRoutes);


app.listen(3000, () => {
	console.log("Server Listening on PORT 3000");
});

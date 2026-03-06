import express from "express";
import passport from "./utils/passport.ts";
import session from "express-session";
import * as LocalStrategy from "passport-local";
import * as path from "path";
import userRoutes from "./routes/userRouters.ts";
import dotEnv from "./utils/dotEnv.ts";

//Declaring the basic usage
const __dirname = import.meta.dirname;
const app = express();

//Setting up the view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(session({
	secret: dotEnv.SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true }
}));

app.use(passport.session());

app.use("/", userRoutes);


app.listen(3000, () => {
	console.log("Server Listening on PORT 3000");
});


export const isAuth = (req, res, next) => {
	if (req.body.isAuthenticated()) {
		next();
	} else {
		res.status(404).json({ "msg": "You are not Authenticated" })
	}
}

export const isAdmin = (req, res, next) => {
	if (req.user.admin === "Admin") {
		next();
	} else {
		res.status(404).json({ "msg": "You are not Authorized to view this Only for Admins." })
	}
}


export const isAuth = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).json({ "msg": "You are not Authenticated" })
	}
}

export const isAdmin = (req, res, next) => {
	if (req.user.membership === "admin") {
		next();
	} else {
		res.status(404).json({ "msg": "You are not Authorized to view this Only for Admins." })
	}
}

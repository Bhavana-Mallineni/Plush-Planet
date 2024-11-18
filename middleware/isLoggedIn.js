const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.isLoggedIn = async function (req, res, next) {
	if (!req.cookies.token) {
		req.flash("error", "You need to login first");
		return res.redirect("/");
	}

	try {
		let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
		let user_data = await userModel.findOne({ email: decoded.email }).select("-password"); // We get complete user data, but we dont need password of the user, so we deselect it by using -password

		req.user = user_data;
		next();
	} catch (err) {
		req.flash("error", "Something went wrong");
		res.redirect("/");
	}
};

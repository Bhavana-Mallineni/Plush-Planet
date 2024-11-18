const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async function (req, res) {
	try {
		let { email, password, fullname } = req.body;

		let user = await userModel.findOne({ email });
		if (!user) {
			bcrypt.genSalt(12, (err, salt) => {
				bcrypt.hash(password, salt, async (err, hash) => {
					if (err) res.send(err.message);
					else {
						let user = await userModel.create({
							fullname,
							email,
							password: hash
						});

						let token = generateToken(user);
						res.cookie("token", token);
						res.redirect("/shop");
					}
				});
			});
		} else {
			req.flash("error", "you already have an Account. please Login");
			res.redirect("/");
		}
	} catch (err) {
		console.log(err.message);
	}
};

module.exports.loginUser = async function (req, res) {
	let { email, password } = req.body;
	let user = await userModel.findOne({ email: email });
	if (!user) {
		return res.status(401).send("email or password incorrect");
	} else {
		bcrypt.compare(password, user.password, (err, result) => {
			if (result) {
				let token = generateToken(user);
				res.cookie("token", token);
				res.redirect("/shop");
			} else {
				req.flash("error", "email or password incorrect");
				res.redirect("/");
			}
		});
	}
};

module.exports.logout = function (re, res) {
	res.clearCookie("token"); // Completely remove the token
	res.redirect("/");
};

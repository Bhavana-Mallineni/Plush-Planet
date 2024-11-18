const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const productModel = require("../models/productModel");

router.get("/", (req, res) => {
	res.send("Hello World!");
});

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
	router.post("/create", async function (req, res) {
		const owners = await ownerModel.find();
		if (owners.length > 0) {
			res.status(400).send({ message: "Owner already exists" });
		}
		let { fullname, email, password } = req.body;

		let createdOwner = await ownerModel.create({
			fullname,
			email,
			password
		});
		res.status(200).send(createdOwner);
	});
}

router.get("/admin", async function (req, res) {
	try {
		let products = await productModel.find();
		let success = req.flash("success");
		res.render("adminPanel", { success, products });
	} catch (error) {
		res.status(500).send({ message: "Error fetching products" });
	}
});

module.exports = router;

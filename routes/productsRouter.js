const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/productModel");

router.post("/create", upload.single("image"), async (req, res) => {
	try {
		let { name, price, discountPrice } = req.body;
		let product = await productModel.create({
			image: req.file.buffer,
			name,
			price,
			discountPrice
		});
		req.flash("success", "Product created successfully");
		res.redirect("/owners/admin");
	} catch (err) {
		res.send(err.message);
	}
});

module.exports = router;

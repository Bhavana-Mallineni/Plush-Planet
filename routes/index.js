const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/", function (req, res) {
	let error = req.flash("error");
	res.render("index", { error });
});

router.get("/shop", isLoggedIn, async function (req, res) {
	let products = await productModel.find();
	let success = req.flash("success");
	res.render("shop", { products, success });
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
	let user = await userModel.findOne({ email: req.user.email });

	const product = await productModel.findOne({ _id: req.params.productid });
	console.log(product);

	const productExists = user.cart.some((item) => item._id.toString() === req.params.productid);

	if (productExists) {
		req.flash("success", "Product already in Cart");
		res.redirect("/shop");
	} else {
		user.cart.push({
			product: req.params.productid,
			quantity: 1
		});
		await user.save();
		req.flash("success", "Product added to cart successfully");
		res.redirect("/shop");
	}
});

router.post("/update-cart/:productId", isLoggedIn, async function (req, res) {
	const { quantity } = req.body;
	let user = await userModel.findOne({ email: req.user.email });
	const cartItem = user.cart.find((item) => item.product.toString() === req.params.productId);
	if (cartItem) {
		cartItem.quantity = quantity;
		const product = await productModel.findOne({ _id: req.params.productId });
		cartItem.price = product.discountPrice * quantity;
		await user.save();

		const cartTotal = user.cart.reduce((sum, item) => sum + item.price, 0);
		return res.json({ itemTotal: cartItem.price, cartTotal });
	}

	res.status(400).send("Product not found in cart");
});

module.exports = router;

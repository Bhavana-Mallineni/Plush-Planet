const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");
const { registerUser, loginUser, logout } = require("../controllers/authController");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const orderModel = require("../models/orderModel");
const { v4: uuidv4 } = require("uuid");

router.get("/", function (req, res) {
	res.send("hello world - users ");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/cart", isLoggedIn, async function (req, res) {
	try {
		let user = await userModel.findOne({ email: req.user.email });
		await user.populate("cart.product");
		console.log("populated cart:", user.cart);
		res.render("cart", { user });
	} catch (error) {
		console.error("Error fetching cart:", error);
		req.flash("error", "Something went wrong");
		res.redirect("/shop");
	}
});

router.post("/save-address", isLoggedIn, async (req, res) => {
	try {
		const { address } = req.body;
		const user = await userModel.findOne({ email: req.user.email });

		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		user.address.push(address);
		await user.save();

		res.status(200).json({
			success: true,
			message: "Address saved successfully",
			index: user.address.length - 1 // New address index
		});
	} catch (error) {
		console.error("Error saving address:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

router.delete("/cart/remove/:id", isLoggedIn, async (req, res) => {
	try {
		const productId = req.params.id;
		let user = await userModel.findOne({ email: req.user.email });
		user.cart = user.cart.filter((item) => item._id.toString() != productId);
		await user.save();
		res.json({ success: true });
	} catch (error) {
		console.error("Error removing product from cart:", error);
		res.json({ success: false });
	}
});

router.post("/place-order", isLoggedIn, async (req, res) => {
	try {
		const { totalAmount, paymentMethod, selectedAddress } = req.body;

		let user = await userModel.findOne({ email: req.user.email }).populate("cart.product");
		if (!user.cart.length) {
			return res.status(404).json({ success: false, message: "Cart is empty" });
		}
		const orderId = crypto.randomBytes(8).toString("hex");

		const newOrder = new orderModel({
			user: user._id,
			products: user.cart,
			totalAmount,
			paymentMethod,
			address: selectedAddress,
			orderId
		});
		await newOrder.save();

		user.cart = [];
		await user.save();
		res.status(200).json({ success: true, message: " order places successfully! " });
	} catch (error) {
		console.error("Error removing product from cart:", error);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
});

router.get("/orders", isLoggedIn, async (req, res) => {
	try {
		const orders = await orderModel.find({ user: req.user._id }).populate("products.product");
		res.render("orders", { orders });
	} catch (error) {
		console.error("Error fetching orders:", error);
		res.status(500).send("Internal server error");
	}
});

module.exports = router;

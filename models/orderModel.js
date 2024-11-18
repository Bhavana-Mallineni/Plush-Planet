const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	orderId: { type: String, required: true, unique: true },
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
		required: true
	},
	products: [
		{
			product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
			quantity: { type: Number, required: true }
		}
	],
	totalAmount: { type: Number, required: true },
	shippingFee: { type: Number, default: 50 },
	status: { type: String, default: "Pending" },
	paymentStatus: { type: String, default: "Unpaid" },
	paymentMethod: { type: String, default: "COD", required: true },
	createdAt: { type: Date, default: Date.now },
	address: { type: String, required: true, default: " " }
});

module.exports = mongoose.model("order", orderSchema);

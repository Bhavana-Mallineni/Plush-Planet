const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	fullname: {
		type: String,
		minLength: 3,
		trim: true
	},
	email: String,
	password: String,
	cart: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "product"
			},
			quantity: {
				type: Number,
				default: 1
			}
		}
	],
	// orders: {
	// 	type: mongoose.Schema.Types.ObjectId,
	// 	ref: "order"
	// },
	contact: Number,
	picture: String,
	address: [
		{
			type: String,
			default: ""
		}
	]
});

module.exports = mongoose.model("user", userSchema);

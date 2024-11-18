// const mongoose = require("mongoose");
// const dbgr = require("debug")("development:mongoose");

// const config = require("config");

// mongoose
// 	.connect(`${config.get("MONGODB_URI")}/plushPlanet`)
// 	.then(function () {
// 		dbgr("Connected to MongoDB");
// 	})
// 	.catch(function (err) {
// 		dbgr("err");
// 	});

// module.exports = mongoose.connection;

const mongoose = require("mongoose");

// Use environment variable or default to local MongoDB
const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/my-local-database";

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("MongoDB connected successfully"))
	.catch((err) => console.error("MongoDB connection error:", err));

module.exports = mongoose;

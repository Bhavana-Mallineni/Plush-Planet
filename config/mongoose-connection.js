const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
// the debug message will be logged with the name provided inside the brackets ("development:mongoose")
// also run the command
// > $env:DEBUG="development:*"
// to log the messages

const config = require("config");

mongoose
	.connect(`${config.get("MONGODB_URI")}/plushPlanet`)
	.then(function () {
		dbgr("Connected to MongoDB");
	})
	.catch(function (err) {
		dbgr("err");
	});

module.exports = mongoose.connection;

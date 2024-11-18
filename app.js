const express = require("express");
const app = express();

const path = require("path");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash");

const db = require("./config/mongoose-connection");

const ownersRouter = require("./routes/ownersRouter.js");
const productsRouter = require("./routes/productsRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const indexRouter = require("./routes/index.js");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(
	expressSession({
		resave: false,
		saveUnitialized: false,
		secret: process.env.EXPRESS_SESSION_SECRET
	})
);
app.use(flash());
app.set("view engine", "ejs");
app.use(express.static(path.join("__dirname", "public")));

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", indexRouter);

app.listen(3000);

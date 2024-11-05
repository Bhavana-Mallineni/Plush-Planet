const express = require('express');
const app = express();

const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require("./config/mongoose-connection");

const ownersRouter = require('./routes/ownersRouter.js');
const productsRouter = require('./routes/productsRouter.js');
const usersRouter = require('./routes/usersRouter.js');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);



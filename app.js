const express = require('express');
const app = express();

const path = require('path');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(express.urlencoded, {extended : true});
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

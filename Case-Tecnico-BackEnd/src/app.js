const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const knex = require('knex');
const knexConfig = require('./database/database');
const router = require("./routes/routes")
const cors = require("cors");

app.use(cors());



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use("/",router);






module.exports = app;
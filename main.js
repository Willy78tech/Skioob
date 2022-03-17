"use strict";

const express = require("express");

const path = require("path");

const dotenv = require("dotenv");
dotenv.config({path: "./.env"});

const app = express();

const expressLayouts = require("express-ejs-layouts");

app.use(express.static(path.resolve(__dirname, "public")));

const router = require("./controllers/router");

const errorsController = require("./controllers/errorsController");

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.set("view engine", "ejs");

app.use(expressLayouts);

app.set("layout", "./layouts/main.ejs");

app.use(router);

app.use(errorsController.respondExternalError);

app.use(errorsController.respondNotFound);

app.listen(process.env.PORT);
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

//session et cookies et flash messages
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const connectFlash = require("connect-flash");

app.use(cookieParser("secret_code"));
app.use(expressSession({
    secret: "secret_code",
    cookie: {
        maxAge: 4000000
    },
    saveUninitialized: false,
    resave: false
}));
app.use(connectFlash());

app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});

app.set("view engine", "ejs");

app.use(expressLayouts);

app.set("layout", "./layouts/main.ejs");

app.use(router);

app.use(errorsController.respondExternalError);

app.use(errorsController.respondNotFound);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Le serveur tourne au http://localhost:${port} `);
});
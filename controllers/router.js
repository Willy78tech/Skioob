"use strict";

const express = require("express");

const router = express.Router();

const connectionController = require("../controllers/connectionController");

const signupController = require("../controllers/signupController");

const logoutController = require("../controllers/logoutController");

const spotController = require("../controllers/spotController");

const errorsController = require("../controllers/errorsController");

const authController = require("../controllers/authController");

const profileController = require("../controllers/profileController");

//connection

router.get("/", connectionController.index);  //affiche la page de connection

router.post("/login", connectionController.connect);   //se connecte en utilisant API

router.get("/signup", signupController.signupPage); //affiche la page d'inscription

router.post("/signup", signupController.signup);   //crée un nouveau user en utilisant API

router.get("/logout", logoutController.logout);    //efface les données de localstorage (serveur)

//profile

router.get("/profile", authController.ifTokenExists, profileController.showProfile);   //si connecté, affiche la page profil

//skiSpots

router.get("/spotfeed/:page", authController.ifTokenExists, spotController.spotFeed);

router.get("/spotform", spotController.spotFormAdd);

router.get('/spotform/:id', authController.ifTokenExists, spotController.spotFormEdit);

router.post('/spotform/:id', authController.ifTokenExists, spotController.spotEdit);

router.post("/spotform", authController.ifTokenExists, spotController.spotAdd);

router.get("/spotinfo/:id", authController.ifTokenExists, spotController.spotInfo);

router.get('/delete/:id', authController.ifTokenExists, spotController.spotDelete);

//errors

router.use(errorsController.respondExternalError);

router.use(errorsController.respondNotFound);

module.exports = router;


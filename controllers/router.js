"use strict";

const express = require("express");

const router = express.Router();

const connectionController = require("../controllers/connectionController");

const signupController = require("../controllers/signupController");

const logoutController = require("../controllers/logoutController");

router.get("/", connectionController.index);  //affiche la page de connection

router.post("/login", connectionController.connect);   //se connecte en utilisant API

router.get("/profile", connectionController.showProfile);   //si connecté, affiche la page profil

router.get("/signup", signupController.signupPage); //affiche la page d'inscription

router.post("/signup", signupController.signup);   //crée un nouveau user en utilisant API

router.get("/logout", logoutController.logout);    //efface les données de localstorage (serveur)

module.exports = router;


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

const usersController = require("../controllers/usersController");

//connection

router.get("/", connectionController.index); //affiche la page de connection

router.post("/login", authController.APIStatus, connectionController.connect); //se connecte en utilisant API

router.get("/signup", signupController.signupPage); //affiche la page d'inscription

router.post("/signup", authController.APIStatus, signupController.signup); //crée un nouveau user en utilisant API

router.get("/logout", logoutController.logout); //efface les données de localstorage (serveur)

//profile

router.get("/profile", authController.APIStatus, authController.ifTokenExists, profileController.showProfile); //si connecté, affiche la page profil

router.post("/profile", authController.APIStatus, authController.ifTokenExists, profileController.editProfile);

router.get("/profile/:userId", authController.APIStatus, authController.ifTokenExists, profileController.showProfileFriend); 

//skiSpots

router.get("/spotfeed/:page", authController.APIStatus, authController.ifTokenExists, spotController.spotFeed);

router.get("/spotform", authController.APIStatus, spotController.spotFormAdd);

router.get('/spotform/:id', authController.APIStatus, authController.ifTokenExists, spotController.spotFormEdit);

router.post('/spotform/:id', authController.APIStatus, authController.ifTokenExists, spotController.spotEdit);

router.post("/spotform", authController.APIStatus, authController.ifTokenExists, spotController.spotAdd);

router.get("/spotinfo/:id", authController.APIStatus, authController.ifTokenExists, spotController.spotInfo);

router.get('/delete/:id', authController.APIStatus, authController.ifTokenExists, spotController.spotDelete);

//route pour rechercher tous les utilisateurs
router.get("/search", authController.APIStatus, usersController.searchThroughUsers);

router.post("/search", authController.APIStatus, usersController.searchThroughUsers);

router.get("/addFriend/:page/:userId", authController.APIStatus, usersController.addFriend);

router.get("/removeFriend/:page/:userId", authController.APIStatus, usersController.removeFriend);


//errors

router.use(errorsController.respondExternalError);

router.use(errorsController.respondNotFound);

module.exports = router;
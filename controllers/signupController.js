"use strict";

const User = require("./models/user");
const apiController = require('./apiController');

//affiche la page d'inscription
exports.signupPage = (req, res) => {
    res.render("signup", {
        title: "Inscription",
        body_class: "start"
    });
};

//crée un nouveau user en utilisant API
exports.signup = async(req, res) => {
    const user = new User(
        req.body.email,
        req.body.name,
        req.body.password
    );

    try {
        await apiController.signup(user);
        req.flash("connect_msg", "Bienvenue dans notre portail");
        //après avoir s'incrit, on va vers la page index pour se connecter
        res.redirect('/');
    } catch (error) {
        res.render("error", { eMessage: error, title: "API erreur" });
    }
};
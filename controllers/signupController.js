"use strict";

const axios = require("axios");

const urlAPI = "https://ski-api.herokuapp.com/signup";

//affiche la page d'inscription
exports.signupPage = (req, res) => {
    res.render("signup", {
        title: "Inscription"
    });
};

//crée un nouveau user en utilisant API
exports.signup = (req, res) => {
    let data = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email        
    };
    
    axios.post(urlAPI, data)
        .then(() => {
<<<<<<< HEAD
=======
            req.flash('connect_msg', 'Bienvenu dans notre portal!');
>>>>>>> 6d2b982b3059ff5b9963a493eb1ccfb927ac118a
            //après avoir s'incrit, on va vers la page index pour se connecter
            res.redirect('/');
            })
        .catch((error) => {
            res.render("error", {
                eMessage: error,
                title: "API erreur"
            });
        });
};
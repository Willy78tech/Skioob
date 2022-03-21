"use strict"

const axios = require("axios");

const validation = require("../functions/validation");

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
    //email doit etre unique
    if(validation.emailUnique(data.email)){
        axios.post(urlAPI, data)
            .then(() => {
                //après avoir s'incrit, on va vers la page index pour se connecter
                res.redirect('/');
                })
            .catch((error) => {
                res.render("error", {
                    eMessage: error,
                    title: "API erreur"
                })
            });
    }
    else{
        res.render("error", {
            eMessage: "Un utilisateur avec le meme email déjà existe! Veuillez aller sur la page de connection pour vous connecter",
            title: "Error"
        })
    }
}
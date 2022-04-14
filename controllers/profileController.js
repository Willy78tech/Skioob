"use strict"

const apiController = require("./apiController");
const User = require("./models/user");

//affiche la page profil
exports.showProfile = (req, res) => {

    const token = res.app.locals.apiToken;

    apiController.getProfile(token)
        .then(result => {

            const user = new User(
                result.data.email, 
                result.data.name
                );

            res.render("profile", {title: "Mon profil", data: user});
        })
        .catch((error) => {
            res.render("error", {eMessage: error.response.data, title: "API erreur"});
        });    
        
};
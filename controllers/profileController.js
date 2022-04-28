"use strict"

const apiController = require("./apiController");
const User = require("./models/user");

//affiche la page profil
exports.showProfile = async(req, res) => {

    const token = res.app.locals.apiToken;

    try{
        const result = await apiController.getProfile(token);
        const user = new User(
            result.data.email, 
            result.data.name
            );

        res.render("profile", {title: "Mon profil", data: user});
    }
    catch(error) {
        res.render("error", {eMessage: error.response.data, title: "API erreur"});
    }        
};

exports.editProfile = async(req, res) => {

    const token = res.app.locals.apiToken;

    var data = {"name": req.body.name};

    try{
        await apiController.updateUser(token, data);
        res.redirect('/profile');
    }
    catch(error) {
        res.render("error", {eMessage: error.response.data, title: "API erreur"});
    }
};


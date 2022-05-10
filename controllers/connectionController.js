"use strict";

const apiController = require("./apiController");

//se connecte en utilisant API
exports.connect = async(req, res) => {

    let data = {
        password: req.body.password,
        email: req.body.email
    };

    try {
        const result = await apiController.login(data);
        let token = result.data.token;
        //API return un token et on le sauvegarde
        if (!!token) {
            res.app.locals.apiToken = token;
            res.redirect(`/spotfeed/1`);
        }
    } catch (error) {
        res.render("error", { eMessage: "The data is invalid", title: "API error" });
    }

};

//affiche la page profil ou le formulaire
exports.index = (req, res) => {

    const token = res.app.locals.apiToken;

    //si user est déjà connecté, on le redérige vers la page de son profil
    if (!!token)
        res.redirect("/profile");
    //si user n'est pas connecté, on affiche la page index avec un formulaire
    else
        res.render("index", { title: "Welcome", body_class: "start" });
};
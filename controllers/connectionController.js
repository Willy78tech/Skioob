"use strict"

const axios = require("axios");

//on va y sauvegarder token et name
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('../store');

const apiLoginUrl = "https://ski-api.herokuapp.com/login";
const apiTokenUrl = "https://ski-api.herokuapp.com/tokenInfo";

//se connecte en utilisant API
exports.connect = (req, res) => {
    let data = {
        password: req.body.password,
        email: req.body.email        
    };

    axios.post(apiLoginUrl, data)
        .then((result) => {
            let token = result.data.token;
            //API return un token et on le sauvegarde
            if (!!token){
                localStorage.setItem("ACCESS_TOKEN", token);
                res.redirect("/profile");
                }
            })
        .catch((error) => {
            res.render("error", {
                eMessage: "Vos données ne sont pas valides ", 
                title: "API erreur"
            });
        });
}

//affiche la page profil ou le formulaire
exports.index = (req, res) => {
    const token = localStorage.getItem("ACCESS_TOKEN");

    //si user est déjà connecté, on le redérige vers la page de son profil
    if(!!token)
        res.redirect(`/profile/${token}`);
    //si user n'est pas connecté, on affiche la page index avec un formulaire
    else
        res.render("index", {title: "Bienvenue"}); 
}

//affiche la page profil
exports.showProfile = (req, res) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if(!!token){

        var config = {
          method: 'get',
          url: apiTokenUrl,
          data : {"access_token": token}
        };
        
        axios(config)
        .then((result) => {
            const userData = {
                name: result.data.name,     
                email: result.data.email
            }; 
            res.render("profile", {
                title: "Mon profil",
                connected: true,    //on utilise cette variable dans le menu.ejs pour afficher le bon menu
                data: userData
            });
        })
        .catch((error) => {
            res.render("error", {
                eMessage: error.response.data,
                title: "API erreur"
            });
        });       
    }
    //sinon on affiche la page d'erreur
    else
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});
}




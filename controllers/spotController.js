"use strict";

var axios = require('axios');

exports.spotFeed = (req, res) => {
    res.render("spotfeed", {
        title : "Spots Feed" 
    } );
};

exports.spotForm = (req, res) => {
    res.render("spotform", {
        title : "Spot Form"
    });
};

exports.spotAdd = (req, res) => {

    const token = res.app.locals.apiToken;
    
    if(!!token){

        var data = {
            "name": req.body.name,
            "description": req.body.description,
            "address": req.body.address,
            "difficulty": req.body.difficulty,
        };
    
        var config = {
            method: 'post',
            url: 'https://ski-api.herokuapp.com/ski-spot',
            headers: {'Authorization': token},
            data : data
        };
        
        axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.redirect("/spotfeed");
        })
        .catch((error) => {
            res.render("error", {
                eMessage: error,
                title: "API erreur"
            });
        });    
    }
    //sinon on affiche la page d'erreur
    else
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});

};


exports.spotInfo = (req, res) => {
    res.render("spotinfo", {
        title : "Spots Info"
    });
};
"use strict";

var axios = require('axios');

const apiController = require('./apiController');

const ifTokenExists = (res, token) => {
    if(!token)
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});
}

//fils d'actualité
exports.spotFeed = (req, res) => {

    const token = res.app.locals.apiToken;

    ifTokenExists(res, token);

    apiController.allSpots(token)
        .then(response  => {
            res.render('spotfeed', {title: "Spot feed", skiSpots: response.data.skiSpots});
        })
        .catch(error => {
            res.render("error", {eMessage: error, title: "API erreur" });
        });
        
};

//afficher la page pour ajouter un spot
exports.spotFormAdd = (req, res) => {
    res.render("spotform", {
        title : "Ajouter le nouveau spot",
        spot: ''
    });
};

exports.spotFormEdit = (req, res) => {

    const token = res.app.locals.apiToken;
    
    if(!!token){

        var spotId = req.params.id;

        var config = {
            method: 'get',
            url: `http://ski-api.herokuapp.com/ski-spot/${spotId}`,
            headers: {'Authorization': token}
          };
          
          axios(config)
          .then(response => {
            res.render("spotform", {
                title : response.data.skiSpot.name,
                spot: response.data.skiSpot
            });
          })
          .catch(error => {
            res.render("error", {
                eMessage: error,
                title: "API erreur"
            });
        });  

    }
    else
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});

}


//sauvegarder les donnees
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
        .then(() => {
            res.redirect("/spotfeed");
        })
        .catch((error) => {
            res.render("error", {
                eMessage: error,
                title: "API erreur"
            });
        });    
    }

    else
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});

};

//modifier les donnees
exports.spotEdit = (req, res) => {

    const token = res.app.locals.apiToken;
    
    if(!!token){

        var spotId = req.params.id;

        var data = {
            "name": req.body.name,
            "description": req.body.description,
            "address": req.body.address,
            "difficulty": req.body.difficulty,
        };
    
        var config = {
            method: 'put',
            url:`http://ski-api.herokuapp.com/ski-spot/${spotId}`,
            headers: {'Authorization': token},
            data : data
        };
        
        axios(config)
        .then(() => {
            res.redirect("/spotfeed");
        })
        .catch((error) => {
            res.render("error", {
                eMessage: error,
                title: "API erreur"
            });
        });    
    }

    else
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});

};

//afficher la page du spot
exports.spotInfo = (req, res) => {

    const token = res.app.locals.apiToken;
    
    if(!!token){

        var spotId = req.params.id;

        var config = {
            method: 'get',
            url: `http://ski-api.herokuapp.com/ski-spot/${spotId}`,
            headers: {'Authorization': token}
          };
          
          axios(config)
          .then(response => {
            res.render("spotinfo", {
                title : "Spots Info",
                skiSpot: response.data.skiSpot
            });
          })
          .catch(error => {
            res.render("error", {
                eMessage: error,
                title: "API erreur"
            });
        });  

    }
    else
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});
};

exports.spotDelete = (req, res) => {

    const token = res.app.locals.apiToken;
    
    if(!!token){

        var spotId = req.params.id;

        var config = {
            method: 'delete',
            url: `http://ski-api.herokuapp.com/ski-spot/${spotId}`,
            headers: {'Authorization': token}
            };
          
          axios(config)
          .then(response => {
            res.redirect('/spotfeed');
          })
          .catch(error => {
            res.render("error", {
                eMessage: error,
                title: "API erreur"
            });
        });  

    }
    else
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});
}
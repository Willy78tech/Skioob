"use strict";

const apiController = require('./apiController');

const badge = (difficulty) => {
    if(difficulty == 'facile')
        return 'success';
    else if (difficulty == 'difficile')
        return 'danger';
    else
        return 'warning';
};

//fils d'actualité
exports.spotFeed = (req, res) => {

    const token = res.app.locals.apiToken;

    var page = req.params.page || 1;
    var perPage = 5;

    apiController.getSpotsPerPage(token, page, perPage)
        .then(response  => {
            res.render('spotfeed', {
                title: "Spot feed", 
                skiSpots: response.data.skiSpots,
                current: page,
                pages: response.data.totalPages,
                user: {name: 'William Garneau'}, // à venir
                badge,
                full: false}); // pas de description, pas de google map
        })
        .catch(error => {
            res.render("error", {eMessage: error, title: "API erreur" });
        });
};

//afficher la page pour ajouter un spot
exports.spotFormAdd = (req, res) => {

    res.render("spotform", {title : "Ajouter le nouveau spot", spot: ''});

};

//afficher la page pour modifier un spot
exports.spotFormEdit = (req, res) => {

    const token = res.app.locals.apiToken;

    const spotId = req.params.id;

    apiController.getSpot(token, spotId)    
        .then(response => {
            res.render("spotform", {
                title : response.data.skiSpot.name, 
                spot: response.data.skiSpot,
                page: req.params.page});
        })
        .catch(error => {
            res.render("error", {eMessage: error, title: "API erreur" });
    });  
};

//sauvegarder les donnees
exports.spotAdd = (req, res) => {

    const token = res.app.locals.apiToken;

    var data = {
        "name": req.body.name,
        "description": req.body.description,
        "coordinates": [req.body.latitude, req.body.longitude],
        "difficulty": req.body.difficulty,
        "address": "Québec, Canada",
        "pictures": [req.body.photo]
    };
    console.log(data);
    apiController.saveSpot(token, data, 'post')    
        .then(() => {
            res.redirect("/spotfeed/1");
        })
        .catch((error) => {
            res.render("error", {eMessage: error, title: "API erreur"});
        });    
};

//modifier les donnees
exports.spotEdit = (req, res) => {

    const token = res.app.locals.apiToken;

    var spotId = req.params.id;

    var data = {
        "name": req.body.name,
        "description": req.body.description,
        "coordinates": [req.body.latitude, req.body.longitude],
        "address": "Québec, Canada",
        "difficulty": req.body.difficulty,
    };
    
    apiController.saveSpot(token, data, 'put', spotId)
        .then(() => {
            res.redirect("/spotfeed/1");
        })
        .catch((error) => {
            res.render("error", {eMessage: error,  title: "API erreur" });
        });    
};

//afficher la page du spot
exports.spotInfo = (req, res) => {

    const token = res.app.locals.apiToken;

    var spotId = req.params.id;

    apiController.getSpot(token, spotId)
          .then(spot => {
              console.log(spot)
             apiController.getUserById(spot.data.skiSpot.created_by, token)
              .then(user => {
                res.render("spotinfo", { 
                    title : "Spots Info", 
                    spot: spot.data.skiSpot, 
                    user: user.data.user,
                    badge,
                    full: true});   //afficher la description au complet
              })
              .catch(error => {
                res.render("error", {eMessage: error, title: "API erreur"});
              });
          })
          .catch(error => {
            res.render("error", {eMessage: error, title: "API erreur"});
        });  
};

//effacer un spot
exports.spotDelete = (req, res) => {

    const token = res.app.locals.apiToken;

    var spotId = req.params.id;

    apiController.saveSpot(token, null, 'delete', spotId)
          .then(() => {
            res.redirect('/spotfeed/1');
          })
          .catch(error => {
            res.render("error", { eMessage: error, title: "API erreur" });
        });  
};
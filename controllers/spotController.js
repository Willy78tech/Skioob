"use strict";

const apiController = require('./apiController');
const axios = require('axios');

let fs = require('fs');

const badge = (difficulty) => {
    if(difficulty == 'facile')
        return 'success';
    else if (difficulty == 'difficile')
        return 'danger';
    else
        return 'warning';
};

//fils d'actualité
exports.spotFeed = async (req, res) => {

    const token = res.app.locals.apiToken;
    
    var page = req.params.page || 1;
    var perPage = 5;
    try {

        const response = await apiController.getSpotsPerPage(token, page, perPage);
        const spots = response.data.skiSpots;
        const total = response.data.total;
        const pages = Math.ceil(total/perPage);
        
            res.render('spotfeed', {
                title: "Spot feed", 
                skiSpots: spots,
                pages: pages,
                total : total,
                user: {name: 'William Garneau'}, // à venir
                badge : badge,
                full: false}); // pas de description, pas de google map
        }
       
        catch(error) {
            res.render("error", {eMessage: error, title: "API erreur" });
        }

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

//on telecharge les fichiers et on retourne le nom du fichier
const savePhoto = (files) => {

    let pictures = [];

    const save = (photo) => {
        let newpath = "public/uploads/";
        let filepath = photo.tempFilePath;

        newpath += photo.name;
    
        fs.rename(filepath, newpath, function () {
            pictures.push(photo.name);
        });
    };

    if(files){
        if(!Array.isArray(files.photo)){
            save(files.photo);
        }
        else{
            files.photo.forEach(photo => {
                save(photo);
            });
        }
    }

    return pictures;
};

//sauvegarder les donnees
exports.spotAdd = async (req, res) => {

    const token = res.app.locals.apiToken;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    let pictures = savePhoto(req.files);
    try {
        const coordinates = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${latitude}&lon=${longitude}`);
        var data = {
            "name": req.body.name,
            "description": req.body.description,
            "coordinates": [req.body.latitude, req.body.longitude],
            "difficulty": req.body.difficulty,
            "address": coordinates.data.features[0].properties.geocoding.country + ', ' +
            coordinates.data.features[0].properties.geocoding.postcode + ', ' +
            coordinates.data.features[0].properties.geocoding.district + ', ' +
            coordinates.data.features[0].properties.geocoding.street,
            "pictures": pictures
        };            
        await apiController.saveSpot(token, data, 'post');  
        res.redirect("/spotfeed/1");         
    }
        catch(error) {
            res.render("error", {eMessage: error,  title: "API erreur" });
        }
};

//modifier les donnees
exports.spotEdit = async (req, res) => {

    const token = res.app.locals.apiToken;

    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    var spotId = req.params.id;

    let pictures = savePhoto(req.files);

    try {
        const coordinates = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=${latitude}&lon=${longitude}`);

        var data = {
            "name": req.body.name,
            "description": req.body.description,
            "coordinates": [req.body.latitude, req.body.longitude],
            "address": JSON.stringify(coordinates.data.features[0].properties.geocoding.label),
            "difficulty": req.body.difficulty,
            "pictures": pictures
        };

        await apiController.saveSpot(token, data, 'put', spotId);
            res.redirect("/spotfeed/1");
    }             
        
    catch(error){
        res.render("error", {eMessage: error,  title: "API address erreur" });
    }
};

//afficher la page du spot
exports.spotInfo = (req, res) => {

    const token = res.app.locals.apiToken;
    
    var spotId = req.params.id;
    
    var configSpot = {
        method: 'get',
        url: `http://ski-api.herokuapp.com/ski-spot/${spotId}`,
        headers: {'Authorization': token}
    };
    
    apiController.getSpot(token, spotId)
          .then(spot => {
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
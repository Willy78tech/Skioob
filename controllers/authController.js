"use strict";

const apiController = require('./apiController');

exports.ifTokenExists = (req, res, next) => {

    const token = res.app.locals.apiToken;

    if (!token)
        res.render("error", { title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page" });
    else
        next();
};

exports.APIStatus = async (req, res, next) => {

    try{
        await apiController.status();
        next();
    }
    catch(error){
        res.render("error", { title: "API's problem", eMessage: "API is down!" });
    }

};
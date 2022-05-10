"use strict";

const apiController = require('./apiController');

exports.ifTokenExists = (req, res, next) => {

    const token = res.app.locals.apiToken;

    if (!token)
        res.render("error", { title: "Forbidden", eMessage: "You don't have access to this page" });
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
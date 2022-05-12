"use strict";

const apiController = require('./apiController');

//middleware for all the function than need a user to be logged in
exports.ifTokenExists = (req, res, next) => {

    const token = res.app.locals.apiToken;

    if (!token)
        res.render("error", { title: "Forbidden", eMessage: "You don't have access to this page" });
    else
        next();
};


//verify if API works
exports.APIStatus = async (req, res, next) => {

    try{
        await apiController.status();
        next();
    }
    catch(error){
        res.render("error", { title: "API's problem", eMessage: "API is down!" });
    }

};
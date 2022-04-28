"use strict"

exports.ifTokenExists = (req, res, next) => {

    const token = res.app.locals.apiToken;

    if(!token)
        res.render("error", {title: "Interdit", eMessage: "Vous n'avez pas l'access à cette page"});
    else
        next();
};
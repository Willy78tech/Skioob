"use strict";

exports.logout = (req, res) => {
    res.app.locals.apiToken = null;
    res.redirect("/");
};
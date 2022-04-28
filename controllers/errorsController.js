"use strict";

const httpStatus = require("http-status-codes");

exports.respondExternalError = (error, req, res, next) => {
    const errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status = errorCode;
    res.render("error", {
        title: errorCode, 
        eMessage: `Sorry, it seems that our site has a problem ${error}`
    });
};

exports.respondNotFound = (req, res) => {
    const errorCode = httpStatus.NOT_FOUND;
    res.status = errorCode;
    res.render("error", {
        title: "Not found",
        eMessage: "Sorry, we haven't planed this address for our website"
    });
};


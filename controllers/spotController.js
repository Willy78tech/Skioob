"use strict";
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


exports.spotInfo = (req, res) => {
    res.render("spotinfo", {
        title : "Spots Info"
    });
};
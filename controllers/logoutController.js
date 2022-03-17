"use strict"

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('../store');

exports.logout = (req, res) => {
    localStorage.clear();
    res.redirect("/");
}
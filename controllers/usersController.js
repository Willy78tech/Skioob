'use strict';

const apiController = require('./apiController');

// rechercher tous les utilisateurs

exports.searchThroughUsers = async(req, res) => {

    const token = res.app.locals.apiToken;
    var search = "";
    if (req.body.search != undefined) {
        search = req.body.search;
        res.app.locals.search = search;
    } 
    else
        search = res.app.locals.search;

    try {
        const users = await apiController.getUsers(token, search);
        const friends = await apiController.getFriends(token);

        res.render('users', {
            title: "Users",
            users: users.data.users,
            friends: friends.data.friends
        });
    } catch (error) {
        res.render("error", { eMessage: error, title: "API erreur" });
    }
};

// ajouter un ami

exports.addFriend = async(req, res) => {

    const token = res.app.locals.apiToken;
    const userId = req.params.userId;
    try {
        await apiController.addFriend(token, userId);
        res.redirect("/search");
    } catch (error) {
        res.render("error", { eMessage: error, title: "API erreur" });
    }

};
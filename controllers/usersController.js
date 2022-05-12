'use strict';

const apiController = require('./apiController');

// rechercher tous les utilisateurs
exports.searchThroughUsers = async(req, res) => {

    const token = res.app.locals.apiToken;
    var search = "";
    //query search after submittin the form of search
    if (req.body.search != undefined) {
        search = req.body.search;
        res.app.locals.search = search;
    } 
    //query search after redirecting after a friend was added
    else
        search = res.app.locals.search;

    if(search == ''){
        res.render("error", { eMessage: "Your search query can't be empty!", title: "Error" });
    }

    try {
        const users = await apiController.getUsers(token, search);
        const friends = await apiController.getFriends(token);

        res.render('users', {
            title: "Users",
            users: users.data.users,
            friends: friends.data.friends,
            self: true
        });
    } catch (error) {
        res.render("error", { eMessage: error, title: "API error" });
    }
};

// add friend
exports.addFriend = async(req, res) => {

    const token = res.app.locals.apiToken;
    const userId = req.params.userId;
    const page = req.params.page;
    
    try {
        await apiController.addFriend(token, userId);
        res.redirect(`/${page}`);
    } catch (error) {
        res.render("error", { eMessage: error, title: "API error" });
    }

};

//delete friend
exports.removeFriend = async(req, res) => {

    const token = res.app.locals.apiToken;
    const userId = req.params.userId;
    const page = req.params.page;

    try {
        await apiController.removeFriend(token, userId);
        req.flash("msg", "Friend removed");
        res.redirect(`/${page}`);
    } catch (error) {
        res.render("error", { eMessage: error, title: "API error" });
    }
};
"use strict"

const apiController = require("./apiController");
const User = require("./models/user");

//affiche la page profil
exports.showProfile = async(req, res) => {

    const token = res.app.locals.apiToken;

    try{
        const result = await apiController.getProfile(token);
        const user = new User(
            result.data.email, 
            result.data.name
            );

        const friends = await apiController.getFriends(token);

        res.render("profile", {title: "Mon profil", data: user, friends: friends.data.friends, self: true});
    }
    catch(error) {
        res.render("error", {eMessage: error.response.data, title: "API erreur"});
    }        
};

//modifier le nom
exports.editProfile = async(req, res) => {

    const token = res.app.locals.apiToken;

    var data = {"name": req.body.name};

    try{
        await apiController.updateUser(token, data);
        res.redirect('/profile');
    }
    catch(error) {
        res.render("error", {eMessage: error.response.data, title: "API erreur"});
    }
};

// Affiche le profil d'un utilisateur
exports.showProfileFriend = async(req, res) => {

    const token = res.app.locals.apiToken;
    const userId = req.params.userId;
    try{
        const result = await apiController.getUserById(userId, token);
        const user = new User(
            result.data.user.email, 
            result.data.user.name
            );

        const friends = await apiController.getFriendsOfUser(userId, token);
        const myFriends = await apiController.getFriends(token);

        res.render("profile", {
            title: user.name, 
            data: user, 
            friends: friends.data.friends, 
            myFriends: myFriends.data.friends,
            self: false
        });
    }
    catch(error) {
        res.render("error", {eMessage: error.response.data, title: "API error"});
    }        
};

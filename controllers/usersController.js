'use strict';

const apiController = require('./apiController');
const axios = require('axios');


 // rechercher tous les utilisateurs

 exports.searchThroughUsers = async (req, res) => {

     const token = res.app.locals.apiToken;
     const query = req.body.search;

     try {

         const users = await apiController.getUsers(token, query);
         const friends = await apiController.getFriends(token);
         console.log(friends.data);
         res.render('users', {
              title: "Users",
              users: users.data.users, 
              friends: friends.data.friends 
         });
         console.log(users.data.users);
     }
     catch(error) {
         res.render("error", { eMessage: error, title: "API erreur" });
     }
 }; 

 // rechercher mes amis





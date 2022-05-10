"use strict";

var axios = require('axios');

exports.status = () => {
    var config = {
        method: 'get',
        url: 'https://ski-api.herokuapp.com/status',
      };

    return axios(config);
};


exports.login = (data) => {
    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/login',
        headers: {},
        data: data
    };

    return axios(config);
};


exports.signup = (data) => {
    var config = {
        method: 'post',
        url: 'https://ski-api.herokuapp.com/signup',
        headers: {},
        data: data
    };

    return axios(config);
};


exports.getProfile = (token) => {

    var config = {
        method: 'get',
        url: "https://ski-api.herokuapp.com/tokenInfo",
        data: { "access_token": token }
    };

    return axios(config);
};


exports.getUserById = (user_id, token) => {

    var config = {
        method: 'get',
        url: `https://ski-api.herokuapp.com/user/${user_id}`,
        headers: { 'Authorization': token }
    };

    return axios(config);
};


exports.updateUser = (token, data) => {

    var config = {
        method: 'put',
        url: 'https://ski-api.herokuapp.com/user',
        headers: { 'Authorization': token },
        data: data
    };

    return axios(config);
};


exports.getAllSpots = (token) => {

    var config = {
        method: 'get',
        url: 'https://ski-api.herokuapp.com/ski-spot',
        headers: { 'Authorization': token }
    };

    return axios(config);
};


exports.getSpotsPerPage = (token, page, limit) => {

    var config = {
        method: 'get',
        url: `https://ski-api.herokuapp.com/ski-spot?page=${page}&limit=${limit}`,
        headers: { 'Authorization': token }
    };

    return axios(config);
};


exports.getSpot = (token, spotId) => {

    var config = {
        method: 'get',
        url: `http://ski-api.herokuapp.com/ski-spot/${spotId}`,
        headers: { 'Authorization': token }
    };

    return axios(config);
};


exports.saveSpot = (token, data, method, spotId = '') => {

    var config = {
        method: method,
        url: `https://ski-api.herokuapp.com/ski-spot/${spotId}`,
        headers: { 'Authorization': token },
        data: data
    };

    return axios(config);
};

exports.getUsers = (token, query) => {


    var config = {
        method: 'get',
        url: `https://ski-api.herokuapp.com/users/search/${query}`,
        headers: { 'Authorization': token }
    };

    return axios(config);
};


exports.addFriend = (token, userId) => {
    var config = {
        method: 'post',
        url: 'http://ski-api.herokuapp.com/friend',
        headers: { 'Authorization': token },
        data: { 'friendId': userId }
    };
    return axios(config);
};


exports.getFriends = (token) => {

    var config = {
        method: 'get',
        url: `https://ski-api.herokuapp.com/friend`,
        headers: { 'Authorization': token }
        
    };

    return axios(config);
};


exports.removeFriend = (token, userId) => {

    var config = {
        method: 'delete',
        url: `https://ski-api.herokuapp.com/friend/${userId}`,
        headers: { 'Authorization': token }
    };

    return axios(config);
};



exports.getFriendsOfUser = (userId, token) => {
    var config = {
        method: 'get',
        url: `https://ski-api.herokuapp.com/friend/${userId}`,
        headers: { 'Authorization': token }
    };
    return axios(config);
};
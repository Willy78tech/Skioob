"use strict"

var axios = require('axios');

exports.allSpots = (token) => {

    var config = {
        method: 'get',
        url: 'https://ski-api.herokuapp.com/ski-spot',
        headers: {'Authorization': token}
    };

    return axios(config);
}
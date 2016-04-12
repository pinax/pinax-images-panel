/* global document jQuery */
const axios = require('axios');

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const getImages = url => {
    return axios.get(url);
};

const postUrl = url => {
    return axios.post(url);
};

const helpers = {
    getImages,
    postUrl,
};

module.exports = helpers;

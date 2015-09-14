var request        = require('superagent');
var config         = require('./config');
var Promise        = require('bluebird');
var chalk          = require('chalk');
var cheerio        = require('cheerio');
require('superagent-bluebird-promise');

/**
 * @param {Mozaik} mozaik
 */
var client = function (mozaik) {

    mozaik.loadApiConfig(config);

    return {
    };
};

module.exports = client;
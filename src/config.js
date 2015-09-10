var convict = require('convict');

var config = convict({
    statereporter: {
        favicon: true
    }
});

module.exports = config;
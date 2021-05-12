const MisDB = require('mongoose'),
    {logs} = require('../util');

MisDB.connect('mongodb://localhost:27017/mis_db');

MisDB.connection.on('connected', () => {
    logs('mongodb connected success');
});

MisDB.connection.on('error', () => {
    logs('mongodb connect error');
});

MisDB.connection.on('disconnected', () => {
    logs('mongodb disconnected');
});

module.exports = MisDB;
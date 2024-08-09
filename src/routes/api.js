const express = require('express');

const routerAPI = express.Router();

const { getUsersApi } = require('../controllers/apiController')

routerAPI.get('/', (req, res) => {
    res.send(" Hello with api")
});

routerAPI.get('/abc', (req, res) => {
    res.status(200).json({
        data: 'hello word with apis'
    })
});

routerAPI.get('/users', getUsersApi);

module.exports = routerAPI;
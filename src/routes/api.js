const express = require('express');

const routerAPI = express.Router();

const { getUsersApi, postCreateUserAPI } = require('../controllers/apiController')


routerAPI.get('/users', getUsersApi);

routerAPI.post('/users', postCreateUserAPI);
module.exports = routerAPI;
const express = require('express');

const routerAPI = express.Router();

const { getUsersApi, postCreateUserAPI, postUpdateUser, deleteUsersAPI, portUploadSingleFileApi } = require('../controllers/apiController')


routerAPI.get('/users', getUsersApi);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', postUpdateUser);

routerAPI.delete('/users', deleteUsersAPI);


routerAPI.post('/file', portUploadSingleFileApi);

module.exports = routerAPI;
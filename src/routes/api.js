const express = require('express');

const routerAPI = express.Router();

const { getUsersApi, postCreateUserAPI, postUpdateUser, deleteUsersAPI, portUploadSingleFileApi, portUploadMultipleFilesApi, } = require('../controllers/apiController')

const { postCreateCustomer, postCreateArrayCustomer } = require('../controllers/customerControler')

routerAPI.get('/users', getUsersApi);

routerAPI.post('/users', postCreateUserAPI);

routerAPI.put('/users', postUpdateUser);

routerAPI.delete('/users', deleteUsersAPI);

routerAPI.post('/file', portUploadSingleFileApi);

routerAPI.post('/files', portUploadMultipleFilesApi)

///////////////Tao List Customer////////////////////
routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);

module.exports = routerAPI;
const express = require('express');

const routerAPI = express.Router();

const { getUsersApi, postCreateUserAPI, postUpdateUser, deleteUsersAPI, portUploadSingleFileApi, portUploadMultipleFilesApi } = require('../controllers/apiController')


const { postCreateCustomer, postCreateArrayCustomer, getAllCustomer, putUpdateCustomer, deleteACustomer, deleteArrayCustomers } = require('../controllers/customerControler')

routerAPI.get('/users', getUsersApi);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', postUpdateUser);
routerAPI.delete('/users', deleteUsersAPI);

routerAPI.post('/file', portUploadSingleFileApi);
routerAPI.post('/files', portUploadMultipleFilesApi)

///////////////Tao List Customer////////////////////

routerAPI.post('/customers', postCreateCustomer);
routerAPI.post('/customers-many', postCreateArrayCustomer);
routerAPI.get('/customers', getAllCustomer);
routerAPI.put('/customers', putUpdateCustomer);
routerAPI.delete('/customers', deleteACustomer);
routerAPI.delete('/customers-many', deleteArrayCustomers);

routerAPI.get('/info', (req, res) => {
    console.log(">>> check query: ", req.query)
    return res.status(200).json({
        data: req.query
    })
});

module.exports = routerAPI;
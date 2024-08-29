const express = require('express');

const routerAPI = express.Router();
//User
const { getUsersApi, postCreateUserAPI, postUpdateUser, deleteUsersAPI, portUploadSingleFileApi, portUploadMultipleFilesApi } = require('../controllers/apiController')
    //Customer
const { postCreateCustomer, postCreateArrayCustomer, getAllCustomer, putUpdateCustomer, deleteACustomer, deleteArrayCustomers } = require('../controllers/customerControler')
    //Projects
const { postCreateProject, getAllProject, putUpdateProject, deleteAProjects } = require('../controllers/projectController');
//Tasks
const { postCreateTasks, getAllTask, putUpdateTasks, deleteATasks } = require('../controllers/tasksController');

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

//////////////////// Tao list project //////////////////////////
routerAPI.post('/projects', postCreateProject);
routerAPI.get('/projects', getAllProject);
routerAPI.put('/projects', putUpdateProject);
routerAPI.delete('/projects', deleteAProjects);


//////////////////// Tao list task //////////////////////////
routerAPI.post('/tasks', postCreateTasks);
routerAPI.get('/tasks', getAllTask);
routerAPI.put('/tasks', putUpdateTasks);
routerAPI.delete('/tasks', deleteATasks);



routerAPI.get('/info', (req, res) => {
    console.log(">>> check query: ", req.query)
    return res.status(200).json({
        data: req.query
    })
});


routerAPI.get('/info/:name/:address', (req, res) => {
    console.log(">>> check params: ", req.params)
    return res.status(200).json({
        data: req.params
    })
});

module.exports = routerAPI;
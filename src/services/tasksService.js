const { default: aqp } = require('api-query-params');
const { postCreateTasks, getAllTask, putUpdateTasks, deleteATasks } = require('../controllers/tasksController');
const Project = require('../models/task');
const { restart } = require('nodemon');

module.exports = {
    createTasks: async(data) => {
        if (data.type == "EMPTY-TASK") {
            let result = await Project.create(data);
            return result;
        }

        // if (data.type === "ADD-USERS") {

        //     let myProject = await Project.findById(data.projectId).exec();

        //     for (let i = 0; i < data.usersArr.length; i++) {
        //         myProject.usersInfor.push(data.usersArr[i]);
        //     }

        //     let newResult = await myProject.save();
        //     return newResult;
        // }
        // if (data.type === "REMOVE-USERS") {
        //     let myProject = await Project.findById(data.projectId).exec();

        //     for (let i = 0; i < data.usersArr.length; i++) {
        //         myProject.usersInfor.pull(data.usersArr[i]);
        //     }

        //     let newResult = await myProject.save();
        //     return newResult;
        // }

        // return null;
    },
    getTask: async(queryString) => {
        const page = queryString.page;

        const { filter, limit, population } = aqp(queryString);
        console.log("before", filter);
        delete filter.page;
        let offset = (page - 1) * limit;
        console.log("after", filter);
        result = await Project.find(filter)
            .populate(population)
            .skip(offset)
            .limit(limit)
            .exec();

        return result;
    },

    putUpdateTaskService: async(data) => {
        let result = await Project.updateOne({ _id: data.id }, {...data });
        return result;

    },

    deleteATasksService: async(id) => {
        let result = await Project.deleteById(id);
        return result
    },
}
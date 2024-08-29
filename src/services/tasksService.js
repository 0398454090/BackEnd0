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
        return null;
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
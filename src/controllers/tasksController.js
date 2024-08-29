const { createTasks, getTask, putUpdateTaskService, deleteATasksService } = require("../services/tasksService");

module.exports = {
    postCreateTasks: async(req, res) => {
        let result = await createTasks(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    getAllTask: async(req, res) => {
        let result = await getTask(req.query);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },


    putUpdateTasks: async(req, res) => {

        let result = await putUpdateTaskService(req.body);

        return res.status(200).json({
            EC: 0,
            data: result
        });
    },


    deleteATasks: async(req, res) => {

        let result = await deleteATasksService(req.body.id);

        return res.status(200).json({
            EC: 0,
            data: result
        });
    }
}
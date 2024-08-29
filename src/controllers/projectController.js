const { createProject, getProject, putUpdateProjectService, deleteAProjectService } = require("../services/productService");

module.exports = {
    postCreateProject: async(req, res) => {
        let result = await createProject(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    getAllProject: async(req, res) => {
        let result = await getProject(req.query);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },


    putUpdateProject: async(req, res) => {

        let result = await putUpdateProjectService(req.body);

        return res.status(200).json({
            EC: 0,
            data: result
        });
    },


    deleteAProjects: async(req, res) => {

        let result = await deleteAProjectService(req.body.id);

        return res.status(200).json({
            EC: 0,
            data: result
        });
    }
}
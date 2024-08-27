const { default: aqp } = require('api-query-params');
const { postCreateProject, getAllProject } = require('../controllers/projectController');
const Project = require('../models/project');
const { restart } = require('nodemon');

module.exports = {
    createProject: async(data) => {
        if (data.type == "EMPTY-PROJECT") {
            let result = await Project.create(data);
            return result;
        }

        if (data.type === "ADD-USERS") {

            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.push(data.usersArr[i]);
            }

            let newResult = await myProject.save();
            return newResult;
        }

        return null;
    },
    getProject: async(queryString) => {
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
    }
}
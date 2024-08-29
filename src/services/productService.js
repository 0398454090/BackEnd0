const aqp = require('api-query-params');
const Project = require('../models/project');


const createProject = async(data) => {
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

    //tast///
    if (data.type === "ADD-TASKS") {
        let myProject = await Project.findById(data.projectId).exec();
        for (let i = 0; i < data.taskArr.length; i++) {
            myProject.tasks.push(data.taskArr[i]);
        }

        let newResult = await myProject.save();
        return newResult;
    }
    //end task//

    if (data.type === "REMOVE-USERS") {
        let myProject = await Project.findById(data.projectId).exec();

        for (let i = 0; i < data.usersArr.length; i++) {
            myProject.usersInfor.pull(data.usersArr[i]);
        }

        let newResult = await myProject.save();
        return newResult;
    }

    return null;
}
const getProject = async(queryString) => {
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

const putUpdateProjectService = async(data) => {

    let result = await Project.updateOne({ _id: data.id }, {...data });
    return result;

}

const deleteAProjectService = async(id) => {
    let result = await Project.deleteById(id);
    return result
}

module.exports = {
    createProject,
    getProject,
    putUpdateProjectService,
    deleteAProjectService
}
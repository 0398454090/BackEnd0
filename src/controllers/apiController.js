const User = require('../models/users');
const { uploadSingleFile } = require('../services/fileService')

const getUsersApi = async(req, res) => {
    let results = await User.find({});

    return res.status(200).json({
        errorCode: 0,
        data: results
    });
}

const postCreateUserAPI = async(req, res) => {

    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.mycity;
    let user = await User.create({
        email: email,
        name: name,
        city: city
    })

    return res.status(200).json({
        errorCode: 0,
        data: user
    });

}


const postUpdateUser = async(req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.mycity;
    let userId = req.body.userId;

    let user = await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
    return res.status(200).json({
        EC: 0,
        data: user
    });

}

const deleteUsersAPI = async(req, res) => {

    const id = req.body.userId;

    let results = await User.deleteOne({
        _id: id
    })

    return res.status(200).json({
        EC: 0,
        data: results
    });
}

const portUploadSingleFileApi = async(req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let result = await uploadSingleFile(req.files.image);
    console.log("check result: ", result)
    return res.send("====> OK Single")
}
module.exports = {
    getUsersApi,
    postCreateUserAPI,
    postUpdateUser,
    deleteUsersAPI,
    portUploadSingleFileApi
}
const User = require('../models/users');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');


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
    return res.status(200).json({
        EC: 0,
        data: result
    })

}


const portUploadMultipleFilesApi = async(req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    } else {
        //upload single
        return await portUploadSingleFileApi(req, res);
    }
}
module.exports = {
    getUsersApi,
    postCreateUserAPI,
    postUpdateUser,
    deleteUsersAPI,
    portUploadSingleFileApi,
    portUploadMultipleFilesApi
}
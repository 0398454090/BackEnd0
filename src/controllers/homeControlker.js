const mongoose = require('mongoose');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDServices');
const User = require("../models/users");

const getHomePage = async(req, res) => {
    try {
        let results = await User.find({});
        return res.render('home.ejs', { listUsers: results });
    } catch (error) {
        console.error("Error fetching home page:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getHoiDanIt = (req, res) => {
    res.render('sample.ejs');
}

const postCreatUser = async(req, res) => {
    try {
        let email = req.body.email.trim();
        let name = req.body.myname.trim();
        let city = req.body.mycity.trim();

        await User.create({
            email: email,
            name: name,
            city: city
        });
        res.send("Create user succeeded!");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
}

const getCreatePage = (req, res) => {
    res.render('create.ejs');
}

const getUpdatePage = async(req, res) => {
    try {
        const userId = req.params.id.trim();
        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid user ID");
        }

        let user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render('edit.ejs', { userEdit: user });
    } catch (error) {
        console.error("Error fetching update page:", error);
        res.status(500).send("Internal Server Error");
    }
}

const postUpdateUser = async(req, res) => {
    try {
        let email = req.body.email.trim();
        let name = req.body.myname.trim();
        let city = req.body.mycity.trim();
        let userId = req.body.userId.trim();

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid user ID");
        }

        //await updateUserById(email, city, name, userId);

        await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
        res.redirect('/');
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
    }
}

const postDeleteUser = async(req, res) => {
    try {
        const userId = req.params.id.trim();

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send("Invalid user ID");
        }
        let user = await User.findById(userId).exec();
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("delete.ejs", { userEdit: user });
    } catch (error) {
        console.error("Error fetching delete page:", error);
        res.status(500).send("Internal Server Error");
    }
}

const postHandleRemoveUser = async(req, res) => {
    try {
        const id = req.body.userId.trim();

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid user ID");
        }

        // await deleteUserById(id);
        let results = await User.deleteOne({
            _id: id
        })
        console.log('>>> result: ', results)
        res.redirect('/');
    } catch (error) {
        console.error("Error handling remove user:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getHomePage,
    getHoiDanIt,
    postCreatUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}
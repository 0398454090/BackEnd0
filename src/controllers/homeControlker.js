const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDServices')

const User = require("../models/users")

const getHomePage = async(req, res) => {

    let results = await User.find({});
    return res.render('home.ejs', { listUsers: results })
}

const getHoiDanIt = (req, res) => {
    // res.send('<h1> Hoi Dan IT </h1>')
    res.render('sample.ejs')
}

const postCreatUser = async(req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.mycity;

    await User.create({
        email: email,
        name: name,
        city: city
    })
    res.send("Create user scucced!")
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async(req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId)
    res.render('edit.ejs', { userEdit: user }) // x <- y
}


const postUpdateUser = async(req, res) => {
    let email = req.body.email;
    let name = req.body.myname;
    let city = req.body.mycity;
    let userId = req.body.userId;
    await updateUserById(email, city, name, userId)
        // res.send(">>> Updated user scucced!")
    res.redirect('/');
}


const postDeleteUser = async(req, res) => {
    const userId = req.params.id;
    let user = await getUserById(userId)

    res.render("delete.ejs", { userEdit: user })
}


const postHandleRemoveUser = async(req, res) => {

    const id = req.body.userId;
    await deleteUserById(id)
    res.redirect('/');

}
module.exports = {
    getHomePage,
    getHoiDanIt,
    postCreatUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser,

}
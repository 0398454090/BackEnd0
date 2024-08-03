const connection = require('../config/database');
const { getAllUsers, getUserById, updateUserById, deleteUserById } = require('../services/CRUDServices')

const getHomePage = async(req, res) => {

    let results = await getAllUsers();
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
    console.log(">>> email: ", email, ">>> name: ", name, ">>> city: ", city);

    // connection.query(
    //     `INSERT INTO Users(email, name, city) VALUES(?, ?, ?)`, [email, name, city],
    //     function(err, results) {
    //         console.log(results);
    //         res.send(">>> create user scucced!")
    //     }
    // );


    // connection.query(
    //     'select * from Users u',
    //     function(err, results, fields) {
    //         console.log(">>>>>>>>>>>>>> result", results)

    //     }
    // )

    //const [results, fields] = await connection.query('select * from Users u');
    let [results, fields] = await connection.query(`INSERT INTO Users(email, name, city) VALUES(?, ?, ?)`, [email, name, city], )
    console.log(">>>>>>>>>>>>>> result", results)
    res.send(">>> create user scucced!")
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
require('dotenv').config()
const express = require('express') //common js
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database')
const Kitten = require('./models/Kitten')

const app = express()
const port = process.env.PORT || 8888; //port => hardcode
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//Khai báo route
app.use('/', webRoutes);

const cat = new Kitten({ name: 'Hoi dan IT cat' });
cat.save();

(async() => {
    try {
        //Test connection
        await connection();
        app.listen(port, hostname, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>>>> Error connect DB: ", error)
    }

})()
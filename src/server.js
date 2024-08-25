require('dotenv').config()
const express = require('express') //common js
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const connection = require('./config/database')

const fileUpload = require('express-fileupload');

const { MongoClient } = require('mongodb');
const app = express()
const port = process.env.PORT || 8888; //port => hardcode
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//Khai báo route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

(async() => {
    try {
        //using mongoose
        //await connection();

        //Using mongodb driver

        // Connection URL
        const url = process.env.DB_HOST_WITH_DRIVER;
        const client = new MongoClient(url);

        // Database Name
        const dbName = process.env.DB_NAME;

        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('customers');

        //collection.insertOne({ "name": "Hoi Dan IT" })
        let a = await collection.findOne({ address: "hcm" })
        console.log(">>> find = ", a)

        //Test connection

        app.listen(port, hostname, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>>>> Error connect DB: ", error)
    }

})()
const mongoose = require('mongoose')

//shape data
const customerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    address: String,
    email: String,
    phone: String,
    image: String,
    description: String

}, { timestamps: true });

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
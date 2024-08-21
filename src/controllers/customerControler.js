const { uploadSingleFile } = require("../services/fileService");
const { createCustomerService, createCustomerArrayService, putUpdateCustomerService } = require("../services/CustomerService")
const Customer = require("../models/customer")

module.exports = {
    postCreateCustomer: async(req, res) => {

        let { name, address, email, phone, description } = req.body;

        let imageUrl = "";

        if (!req.files || Object.keys(req.files).length === 0) {
            // no nothing
        } else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
        }
        let customerData = {
            name,
            address,
            email,
            phone,
            description,
            image: imageUrl
        }
        let customer = await createCustomerService(customerData);

        return res.status(200).json({
            EC: 0,
            data: customer
        })
    },
    postCreateArrayCustomer: async(req, res) => {
        let customers = await createCustomerArrayService(req.body.customers);

        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: customers
            })
        }
    },
    getAllCustomer: async(req, res) => {
        let results = await Customer.find({});

        return res.status(200).json({
            errorCode: 0,
            data: results
        });
    },

    putUpdateCustomer: async(req, res) => {
        let { id, name, email, address } = req.body;

        let result = await putUpdateCustomerService({ id, name, email, address });
        return res.status(200).json({
            EC: 0,
            data: result
        });
    },

}
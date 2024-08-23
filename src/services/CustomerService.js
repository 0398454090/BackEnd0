const Customer = require("../models/customer");

const createCustomerService = async(customerData) => {
    console.log(">>> check Customer data: ", customerData)
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            email: customerData.email,
            phone: customerData.phone,
            description: customerData.description,
            image: customerData.image
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createCustomerArrayService = async(arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result
    } catch (error) {
        console.log("error", error);
        return null;
    }
}
const getAllCustomerService = async(limit, page) => {
    try {
        let result = null;
        if (limit && page) {

            let offset = (page - 1) * limit;

            result = await Customer.find({}).skip(offset).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }

        return result

    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const putUpdateCustomerService = async(id, name, email, address) => {
    try {
        let result = await Customer.updateOne({ id: id }, { name, email, address });
        return result
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const deleteACustomerService = async(id) => {
    try {
        let result = await Customer.deleteById(id);
        return result
    } catch (error) {
        console.log("error", error);
        return null;
    }
}

const deleteArrayCustomersService = async(ids) => {

    try {
        let result = await Customer.deleteMany({ _id: { $in: ids } });
        return result;
    } catch (error) {
        console.log("error", error);
        return null;
    }
}


module.exports = {
    createCustomerService,
    createCustomerArrayService,
    getAllCustomerService,
    putUpdateCustomerService,
    deleteACustomerService,
    deleteArrayCustomersService
}
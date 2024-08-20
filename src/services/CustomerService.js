const Customer = require("../models/customer");

createCustomerService = async(customerData) => {
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

module.exports = {
    createCustomerService
}
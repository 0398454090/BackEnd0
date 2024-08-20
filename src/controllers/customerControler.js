const { uploadSingleFile } = require("../services/fileService");
const { createCustomerService } = require("../services/CustomerService")
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
    }
}
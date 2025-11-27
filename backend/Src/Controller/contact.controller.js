const contactModel = require("../Model/contact.model");
const { apiError } = require("../Utils/ApiError");
const { apiResponse } = require("../Utils/ApiResponse");



const createContact = async (req, res) => {
    try {
        console.log("creating contact");
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res
                .status(400)
                .json(new apiError(false, null, "Name, email and message are required", true));
        }

        const contactData = await contactModel.create({
            name: name,
            email: email,
            phone: phone,
            message: message,
        });
        if (!contactData) {
            return res
                .status(501)
                .json(new apiError(false, null, "Failed to create contact", true));
        }
        return res
            .status(201)
            .json(new apiResponse(true, contactData, "Contact created successfully", false));


    } catch (error) {
        console.error("❌ Error creating contact", error);
        return res
            .status(500)
            .json(new apiError(false, null, "Internal server error", true));
    }
}

const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find({});
        return res
            .status(200)
            .json(new apiResponse(true, contacts, "Contacts fetched successfully", false));
    } catch (error) {
        console.error("❌ Error fetching contacts", error);
        return res
            .status(500)
            .json(new apiError(false, null, "Internal server error", true));
    }
}
module.exports = {
    createContact,
    getAllContacts
};
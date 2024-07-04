const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        customerId: {
            type: Number,
            unique: true, // Ensure customerId is unique if needed
        },
        firstName: {
            type: String,
            required: [true, "Field first name is required"],
        },
        lastName: {
            type: String,
            required: [true, "Field last name is required"],
        },
        email: {
            type: String,
            required: [true, "Field email is required"],
            unique: true, // Ensure email is unique
        },
        address: {
            type: String,
            required: [true, "Field address is required"],
        },
        phone: {
            type: Number, // Store phone numbers as strings
            required: [true, "Field phone is required"],
        },
        image: {
            type: String,
            require: false
        }
    }
);

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

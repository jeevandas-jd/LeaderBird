const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email ID is required"],
        unique: [true, "This email ID is already used"],
        trim: true,
        minlength: [5, "Email must have at least 5 characters"],
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        select: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
        select: false
    },
    verificationCodeValidation: {
        type: Number,
        select: false
    },
    forgotPasswordCode: {
        type: String,
        select: false
    },
    forgotPasswordCodeValidation: {
        type: Number,
        select: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);

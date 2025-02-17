const { signupSchema, signinSchema } = require("../middlewares/validator");
const User = require("../models/usermodel");
const { doHash, doHashValidation } = require("./utils/hashing");
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')
// Ensure app.use(express.json()) is in server.js, not here

exports.signup = async (req, res) => {
    const { email, password } = req.body; // Corrected 'res.body' → 'req.body'

    try {
        // Validate input
        const { error } = signupSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await doHash(password, 12);

        // Save new user
        const newUser = new User({ email, password: hashedPassword });
        const result = await newUser.save();

        result.password = undefined; // Hide password from response
        res.status(201).json({ success: true, message: "User signup successful", result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};


exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        const { error } = signinSchema.validate({ email, password });
        if (error) {
            return res.status(400).json({ success: false, message: error.details[0].message });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email }).select("+password");
        if (!existingUser) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }

        // Compare hashed password
        const isPasswordValid = await doHashValidation(password, existingUser.password);
        console.log(`comapre result => ${isPasswordValid}`)
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT token       
        const token = jwt.sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
                verified: existingUser.verified
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '8h' }
        );

        res.cookie('Authorization', `Bearer ${token}`, {
            expires: new Date(Date.now() + 8 * 3600000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        }).json({ success: true, token, message: "Login successful" });

    } catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}